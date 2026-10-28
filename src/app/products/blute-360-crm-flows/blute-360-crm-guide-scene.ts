import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { CrmGuide } from './blute-360-crm-flows.data';

const TARGET_HEIGHT = 3.4;
const CAMERA_DISTANCE = 15;
// Raising the look-at point moves the character lower in the frame.
const FRAME_LIFT = 1.2;
const BODY_URL = '/models/guides/Michelle.glb';
const DANCE_CLIP = 'SambaDance';

export class GuideScene {
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  private readonly renderer: THREE.WebGLRenderer;
  private readonly clock = new THREE.Clock();
  private readonly resizeObserver: ResizeObserver;
  private readonly disposables: { dispose(): void }[] = [];
  private mixer?: THREE.AnimationMixer;
  private frameId = 0;
  private disposed = false;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly guide: CrmGuide,
    private readonly reducedMotion: boolean
  ) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(2, 4, 5);
    const rim = new THREE.DirectionalLight(0xa78bfa, 1.8);
    rim.position.set(-3, 2, -3);
    this.scene.add(key, rim);

    this.camera.position.set(0, TARGET_HEIGHT * 0.55 + FRAME_LIFT, CAMERA_DISTANCE);
    this.camera.lookAt(0, TARGET_HEIGHT * 0.5 + FRAME_LIFT, 0);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.resize();
    this.load();
    this.frameId = requestAnimationFrame(this.tick);
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.frameId);
    this.resizeObserver.disconnect();
    this.mixer?.stopAllAction();
    this.disposables.forEach((d) => d.dispose());
    this.renderer.dispose();
  }

  private load(): void {
    new GLTFLoader()
      .loadAsync(BODY_URL)
      .then((body) => {
        if (this.disposed) return;
        const model = SkeletonUtils.clone(body.scene);
        // Precise bounds use the skinned vertices; the plain box misreads the height.
        model.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(model, true);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale = TARGET_HEIGHT / size.y;
        model.scale.setScalar(scale);
        model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
        model.traverse((o) => {
          if (o instanceof THREE.Mesh && o.material instanceof THREE.MeshStandardMaterial) {
            const material = o.material.clone();
            material.color.multiply(new THREE.Color(this.guide.tint));
            o.material = material;
            o.frustumCulled = false;
            this.disposables.push(material);
          }
        });
        this.scene.add(model);
        this.mixer = new THREE.AnimationMixer(model);
        const dance = body.animations.find((c) => c.name === DANCE_CLIP);
        if (dance) this.mixer.clipAction(dance).setLoop(THREE.LoopRepeat, Infinity).play();
      })
      .catch(() => undefined);
  }

  private resize(): void {
    const { clientWidth: w, clientHeight: h } = this.canvas;
    if (w === 0 || h === 0) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  private readonly tick = (): void => {
    this.frameId = requestAnimationFrame(this.tick);
    const dt = this.clock.getDelta();
    if (!this.reducedMotion) this.mixer?.update(dt);
    this.renderer.render(this.scene, this.camera);
  };
}
