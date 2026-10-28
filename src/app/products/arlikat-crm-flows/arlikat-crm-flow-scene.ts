import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CrmFlowStep } from './arlikat-crm-flows.data';

const NODE_W = 2.6;
const NODE_H = 1.6;
const NODE_D = 0.45;
const STEP_X = 3.6;
const ACTIVE_SCALE = 1.18;
const CLICK_SLOP_PX = 6;
const COLOR_IDLE = 0x5b21b6;
const COLOR_ACTIVE = 0xa855f7;
const COLOR_DONE = 0x10b981;

interface StepNode {
  readonly group: THREE.Group;
  readonly body: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;
  readonly base: THREE.Vector3;
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  return text.split(' ').reduce<string[]>((lines, word) => {
    const last = lines.at(-1) ?? '';
    const candidate = last ? `${last} ${word}` : word;
    return ctx.measureText(candidate).width > maxWidth && last
      ? [...lines, word]
      : [...lines.slice(0, -1), candidate];
  }, []);
}

function makeLabelTexture(index: number, title: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 316;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 120px Inter, system-ui, sans-serif';
    ctx.textBaseline = 'top';
    ctx.globalAlpha = 0.9;
    ctx.fillText(String(index + 1).padStart(2, '0'), 36, 24);
    ctx.globalAlpha = 1;
    ctx.font = '700 44px Inter, system-ui, sans-serif';
    wrapLines(ctx, title, 440)
      .slice(0, 2)
      .forEach((line, i) => ctx.fillText(line, 36, 168 + i * 56));
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export class FlowScene {
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
  private readonly renderer: THREE.WebGLRenderer;
  private readonly controls: OrbitControls;
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly clock = new THREE.Clock();
  private readonly disposables: { dispose(): void }[] = [];
  private readonly nodes: StepNode[] = [];
  private readonly camTarget = new THREE.Vector3();
  private readonly camPos = new THREE.Vector3();
  private readonly resizeObserver: ResizeObserver;
  private packet?: THREE.Mesh;
  private curve?: THREE.CatmullRomCurve3;
  private frameId = 0;
  private active = 0;
  private downAt = { x: 0, y: 0 };

  constructor(
    private readonly canvas: HTMLCanvasElement,
    steps: readonly CrmFlowStep[],
    private readonly reducedMotion: boolean,
    private readonly onSelect: (index: number) => void
  ) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 30;
    this.controls.maxPolarAngle = Math.PI * 0.62;

    this.buildLights();
    this.buildPath(steps);
    this.buildNodes(steps);
    this.buildParticles(steps.length);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    canvas.addEventListener('pointerdown', this.onPointerDown);
    canvas.addEventListener('pointerup', this.onPointerUp);

    this.focusOn(0, true);
    this.resize();
    this.frameId = requestAnimationFrame(this.tick);
  }

  setActive(index: number): void {
    this.active = index;
    this.focusOn(index, false);
  }

  dispose(): void {
    cancelAnimationFrame(this.frameId);
    this.resizeObserver.disconnect();
    this.canvas.removeEventListener('pointerdown', this.onPointerDown);
    this.canvas.removeEventListener('pointerup', this.onPointerUp);
    this.controls.dispose();
    this.disposables.forEach((d) => d.dispose());
    this.renderer.dispose();
  }

  private position(index: number, count: number): THREE.Vector3 {
    const t = index * 0.85;
    return new THREE.Vector3((index - (count - 1) / 2) * STEP_X, Math.sin(t) * 1.3, Math.cos(t) * 2);
  }

  private buildLights(): void {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(6, 10, 8);
    const rim = new THREE.PointLight(0x8b5cf6, 80, 40);
    rim.position.set(-8, 4, -6);
    this.scene.add(key, rim);
  }

  private buildPath(steps: readonly CrmFlowStep[]): void {
    const points = steps.map((_, i) => this.position(i, steps.length));
    this.curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
    const tube = new THREE.TubeGeometry(this.curve, steps.length * 24, 0.07, 10, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.9,
      roughness: 0.3,
    });
    this.scene.add(new THREE.Mesh(tube, tubeMat));

    const packetGeo = new THREE.SphereGeometry(0.2, 24, 24);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xfde68a });
    this.packet = new THREE.Mesh(packetGeo, packetMat);
    this.scene.add(this.packet);
    this.disposables.push(tube, tubeMat, packetGeo, packetMat);
  }

  private buildNodes(steps: readonly CrmFlowStep[]): void {
    const bodyGeo = new THREE.BoxGeometry(NODE_W, NODE_H, NODE_D);
    const labelGeo = new THREE.PlaneGeometry(NODE_W * 0.92, NODE_H * 0.92);
    this.disposables.push(bodyGeo, labelGeo);

    steps.forEach((step, i) => {
      const body = new THREE.Mesh(
        bodyGeo,
        new THREE.MeshStandardMaterial({
          color: COLOR_IDLE,
          emissive: COLOR_IDLE,
          emissiveIntensity: 0.25,
          roughness: 0.35,
          metalness: 0.25,
        })
      );
      const texture = makeLabelTexture(i, step.title);
      const labelMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const label = new THREE.Mesh(labelGeo, labelMat);
      label.position.z = NODE_D / 2 + 0.01;
      body.userData['index'] = i;
      label.userData['index'] = i;

      const group = new THREE.Group();
      group.add(body, label);
      const base = this.position(i, steps.length);
      group.position.copy(base);
      this.scene.add(group);
      this.nodes.push({ group, body, base });
      this.disposables.push(body.material, labelMat, texture);
    });
  }

  private buildParticles(count: number): void {
    const total = 260;
    const spread = count * STEP_X;
    const data = Float32Array.from({ length: total * 3 }, (_, i) =>
      i % 3 === 0 ? (Math.random() - 0.5) * spread * 1.4 : (Math.random() - 0.5) * 14
    );
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(data, 3));
    const mat = new THREE.PointsMaterial({ color: 0xc4b5fd, size: 0.06, transparent: true, opacity: 0.7 });
    this.scene.add(new THREE.Points(geo, mat));
    this.disposables.push(geo, mat);
  }

  private focusOn(index: number, instant: boolean): void {
    const node = this.nodes[index];
    if (!node) return;
    this.camTarget.copy(node.base);
    this.camPos.set(node.base.x, node.base.y + 2.2, node.base.z + 9);
    if (instant) {
      this.controls.target.copy(this.camTarget);
      this.camera.position.copy(this.camPos);
    }
  }

  private resize(): void {
    const { clientWidth: w, clientHeight: h } = this.canvas;
    if (w === 0 || h === 0) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  private readonly onPointerDown = (e: PointerEvent): void => {
    this.downAt = { x: e.clientX, y: e.clientY };
  };

  private readonly onPointerUp = (e: PointerEvent): void => {
    const moved = Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y);
    if (moved > CLICK_SLOP_PX) return;
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = this.raycaster.intersectObjects(this.nodes.map((n) => n.group), true)[0];
    const index: unknown = hit?.object.userData['index'];
    if (typeof index === 'number') this.onSelect(index);
  };

  private readonly tick = (): void => {
    this.frameId = requestAnimationFrame(this.tick);
    const elapsed = this.clock.getElapsedTime();
    const ease = this.reducedMotion ? 1 : 0.06;

    // Slide the orbit centre and the camera together so the user's chosen angle is kept.
    const before = this.controls.target.clone();
    this.controls.target.lerp(this.camTarget, ease);
    this.camera.position.add(this.controls.target.clone().sub(before));
    this.controls.update();

    this.nodes.forEach((node, i) => {
      const isActive = i === this.active;
      const targetScale = isActive ? ACTIVE_SCALE : 1;
      node.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
      node.group.position.y = node.base.y + (this.reducedMotion ? 0 : Math.sin(elapsed * 1.2 + i) * 0.12);
      node.group.rotation.y = this.reducedMotion ? 0 : Math.sin(elapsed * 0.5 + i) * 0.08;
      const color = isActive ? COLOR_ACTIVE : i < this.active ? COLOR_DONE : COLOR_IDLE;
      node.body.material.color.lerp(new THREE.Color(color), 0.12);
      node.body.material.emissive.lerp(new THREE.Color(color), 0.12);
      node.body.material.emissiveIntensity = isActive ? 0.7 : 0.25;
    });

    if (this.packet && this.curve) {
      this.packet.position.copy(this.curve.getPointAt(this.reducedMotion ? 0 : (elapsed * 0.06) % 1));
    }
    this.renderer.render(this.scene, this.camera);
  };
}
