import { Directive, ElementRef, NgZone, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Publishes the pointer position inside the host as --spot-x / --spot-y (px)
 * and --spot-opacity, so CSS can draw a spotlight that follows the cursor.
 */
@Directive({
  selector: '[appCursorSpotlight]',
  standalone: true,
})
export class CursorSpotlightDirective implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private frame = 0;

  private readonly onMove = (e: PointerEvent): void => {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const el = this.host.nativeElement;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
      el.style.setProperty('--spot-opacity', '1');
    });
  };

  private readonly onLeave = (): void => {
    this.host.nativeElement.style.setProperty('--spot-opacity', '0');
  };

  ngOnInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = this.host.nativeElement;
    this.zone.runOutsideAngular(() => {
      el.addEventListener('pointermove', this.onMove, { passive: true });
      el.addEventListener('pointerleave', this.onLeave);
    });
  }

  ngOnDestroy(): void {
    const el = this.host.nativeElement;
    cancelAnimationFrame(this.frame);
    el.removeEventListener('pointermove', this.onMove);
    el.removeEventListener('pointerleave', this.onLeave);
  }
}
