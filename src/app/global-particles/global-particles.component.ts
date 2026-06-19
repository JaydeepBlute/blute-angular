import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';

interface Particle {
  x: number; y: number;
  homeX: number; homeY: number;
  vx: number; vy: number;
  size: number; color: string;
}

@Component({
  selector: 'app-global-particles',
  standalone: true,
  template: `
    <!-- Fixed canvas covering the entire viewport, behind content -->
    <canvas id="gp-canvas"
      style="position:fixed;inset:0;width:100%;height:100%;
             pointer-events:none;z-index:9;"></canvas>

    <!-- Stripe-style gradient orb following the cursor -->
    <div id="gp-orb"
      style="position:fixed;top:0;left:0;
             width:700px;height:700px;border-radius:50%;
             pointer-events:none;z-index:9;
             background:radial-gradient(ellipse at center,
               rgba(83,58,253,0.10) 0%,
               rgba(247,45,243,0.04) 45%,
               transparent 70%);
             transition:transform 0.18s cubic-bezier(0.23,1,0.32,1);
             will-change:transform;
             transform:translate(-9999px,-9999px);">
    </div>
  `,
})
export class GlobalParticlesComponent implements OnInit, OnDestroy {
  private canvas: HTMLCanvasElement | null = null;
  private ctx:    CanvasRenderingContext2D | null = null;
  private orb:    HTMLElement | null = null;
  private particles: Particle[] = [];
  private mouse = { x: -9999, y: -9999 };
  private raf  = 0;
  private dpr  = 1;
  private ro:  ResizeObserver | null = null;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    this.ngZone.runOutsideAngular(() => this.init());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('mousemove',  this.onMove);
    window.removeEventListener('mouseleave', this.onLeave);
    window.removeEventListener('touchmove',  this.onTouch);
    this.ro?.disconnect();
  }

  // ── Event handlers ───────────────────────────────────────────────

  private onMove = (e: MouseEvent): void => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    if (this.orb) {
      this.orb.style.transform =
        `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`;
    }
  };

  private onLeave = (): void => {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  };

  private onTouch = (e: TouchEvent): void => {
    const t = e.touches[0];
    this.mouse.x = t.clientX;
    this.mouse.y = t.clientY;
  };

  // ── Initialisation ───────────────────────────────────────────────

  private init(): void {
    this.canvas = document.getElementById('gp-canvas') as HTMLCanvasElement;
    this.orb    = document.getElementById('gp-orb');
    if (!this.canvas) return;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;

    this.sizeCanvas();
    this.spawn();

    window.addEventListener('mousemove',  this.onMove);
    window.addEventListener('mouseleave', this.onLeave);
    window.addEventListener('touchmove',  this.onTouch, { passive: true });

    this.ro = new ResizeObserver(() => { this.sizeCanvas(); this.spawn(); });
    this.ro.observe(document.body);

    this.loop();
  }

  private sizeCanvas(): void {
    if (!this.canvas || !this.ctx) return;
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width  = window.innerWidth  * this.dpr;
    this.canvas.height = window.innerHeight * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private spawn(): void {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const count = Math.max(60, Math.floor((W * H) / 8000));

    // Palette: violet/magenta/white/ice-blue — works on dark AND light bgs
    const PALETTE: [number, number, number, number][] = [
      [ 83,  58, 253, 0.22],   // brand violet
      [165, 148, 255, 0.18],   // violet-light
      [247,  45, 243, 0.10],   // magenta (subtle)
      [255, 255, 255, 0.13],   // white   (visible on dark pages)
      [200, 220, 255, 0.14],   // ice blue
    ];

    this.particles = Array.from({ length: count }, () => {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const [r, g, b, a] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      return {
        x, y, homeX: x, homeY: y,
        vx: 0, vy: 0,
        size:  0.6 + Math.random() * 1.8,
        color: `rgba(${r},${g},${b},${a})`,
      };
    });
  }

  // ── Animation loop ───────────────────────────────────────────────

  private loop = (): void => {
    this.raf = requestAnimationFrame(this.loop);
    if (!this.ctx) return;

    const ctx = this.ctx;
    const W   = window.innerWidth;
    const H   = window.innerHeight;
    ctx.clearRect(0, 0, W, H);

    const REPEL_R2 = 120 * 120;
    const REPEL_F  = 3500;
    const SPRING   = 0.036;
    const DAMP     = 0.87;
    const mx = this.mouse.x;
    const my = this.mouse.y;

    for (const p of this.particles) {
      // Spring back to home
      p.vx += (p.homeX - p.x) * SPRING;
      p.vy += (p.homeY - p.y) * SPRING;

      // Mouse repulsion (antigravity)
      const dx = p.x - mx;
      const dy = p.y - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < REPEL_R2) {
        const d  = Math.sqrt(d2) + 0.1;
        const f  = REPEL_F / (d2 + 40);
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }

      p.vx *= DAMP;  p.vy *= DAMP;
      p.x  += p.vx;  p.y  += p.vy;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, 6.2832);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  };
}
