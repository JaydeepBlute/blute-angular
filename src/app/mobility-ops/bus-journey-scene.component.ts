import { Component, ElementRef, OnDestroy, afterNextRender, viewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const MODEL_URL = '/models/LittlestTokyo.glb';
const DRACO_PATH = '/draco/';
const MODEL_SCALE = 0.01;
const AUTO_ROTATE_SPEED = 0.8;

@Component({
  selector: 'app-bus-journey-scene',
  standalone: true,
  template: `
    <section class="mt-4 mb-16 p-0 md:p-4" aria-label="Route journey animation">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <canvas #sceneCanvas class="journey-canvas" role="img" aria-label="Animated city and train journey scene"></canvas>
        <div>
          <p class="text-rose-400 text-xs font-bold uppercase tracking-widest mb-2">JOURNEY VIEW</p>
          <h2 class="text-3xl font-bold text-white font-display">From booking to boarding</h2>
          <p class="text-slate-400 text-sm mt-3 max-w-md">
            An animated route scene. Drag to rotate and scroll to zoom.
          </p>
          <p class="text-[11px] text-slate-500 mt-6">
            Model: "Littlest Tokyo" by Glen Fox, licensed CC BY 4.0.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .journey-canvas {
        display: block;
        width: 100%;
        height: min(50vh, 420px);
        min-height: 280px;
        border-radius: 20px;
        cursor: grab;
        touch-action: pan-y;
      }
      .journey-canvas:active {
        cursor: grabbing;
      }
    `,
  ],
})
export class BusJourneySceneComponent implements OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('sceneCanvas');
  private teardown?: () => void;

  constructor() {
    afterNextRender(() => {
      this.teardown = this.start(this.canvasRef().nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.teardown?.();
  }

  private start(canvas: HTMLCanvasElement): () => void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = new RoomEnvironment();
    const envTexture = pmrem.fromScene(environment, 0.04).texture;

    const scene = new THREE.Scene();
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(40, 1, 1, 100);
    camera.position.set(6, 2.4, 9.5);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0.5, 0);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = AUTO_ROTATE_SPEED;
    controls.update();

    const draco = new DRACOLoader().setDecoderPath(DRACO_PATH);
    const loader = new GLTFLoader().setDRACOLoader(draco);
    const clock = new THREE.Clock();
    let mixer: THREE.AnimationMixer | undefined;
    let visible = true;
    let disposed = false;
    let frameId = 0;

    loader
      .loadAsync(MODEL_URL)
      .then((gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.setScalar(MODEL_SCALE);
        scene.add(model);
        const first = gltf.animations[0];
        if (first) {
          mixer = new THREE.AnimationMixer(model);
          mixer.clipAction(first).play();
        }
      })
      .catch(() => undefined);

    const resize = (): void => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    visibilityObserver.observe(canvas);
    resize();

    const tick = (): void => {
      frameId = requestAnimationFrame(tick);
      const dt = clock.getDelta();
      if (!visible) return;
      if (!reducedMotion) mixer?.update(dt);
      controls.update();
      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      controls.dispose();
      draco.dispose();
      envTexture.dispose();
      pmrem.dispose();
      environment.dispose();
      renderer.dispose();
    };
  }
}
