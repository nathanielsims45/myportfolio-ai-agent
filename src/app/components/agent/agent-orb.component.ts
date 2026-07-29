import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone, Input,
} from '@angular/core';
import * as THREE from 'three';

/** Small floating 3D avatar orb: follows the cursor, reacts to talk/listen state. */
@Component({
  selector: 'app-agent-orb',
  template: `<canvas #c class="block w-full h-full"></canvas>`,
  styles: [`:host{display:block;width:100%;height:100%}`],
})
export class AgentOrbComponent implements AfterViewInit, OnDestroy {
  @ViewChild('c', { read: ElementRef }) canvasRef!: ElementRef<HTMLCanvasElement>;

  /** 0 = idle, 1 = speaking, 2 = listening */
  @Input() state: 0 | 1 | 2 = 0;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private core!: THREE.Mesh;
  private shell!: THREE.Mesh;
  private particles!: THREE.Points;
  private raf = 0;
  private disposed = false;
  private clock = new THREE.Clock();

  private targetRot = new THREE.Vector2(0, 0);
  private currentRot = new THREE.Vector2(0, 0);

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.init());
  }

  private init(): void {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.clientWidth || 96;
    const h = canvas.clientHeight || 96;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h, false);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 20);
    this.camera.position.z = 3.4;

    const coreGeo = new THREE.IcosahedronGeometry(0.85, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x7c5cff, wireframe: true, transparent: true, opacity: 0.9,
    });
    this.core = new THREE.Mesh(coreGeo, coreMat);
    this.scene.add(this.core);

    const shellGeo = new THREE.IcosahedronGeometry(1.05, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.35,
    });
    this.shell = new THREE.Mesh(shellGeo, shellMat);
    this.scene.add(this.shell);

    const pCount = 60;
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 1.3 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffffff, size: 0.035, transparent: true, opacity: 0.8,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    this.particles = new THREE.Points(pGeo, pMat);
    this.scene.add(this.particles);

    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('resize', this.onResize);

    this.animate();
  }

  private onMouseMove = (e: MouseEvent) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.targetRot.x = ((e.clientY / h) * 2 - 1) * 0.4;
    this.targetRot.y = ((e.clientX / w) * 2 - 1) * 0.4;
  };

  private onResize = () => {
    if (!this.renderer) return;
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.clientWidth || 96;
    const h = canvas.clientHeight || 96;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  };

  private animate = () => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.animate);
    const t = this.clock.getElapsedTime();

    this.currentRot.lerp(this.targetRot, 0.06);
    this.core.rotation.x = this.currentRot.x + t * 0.15;
    this.core.rotation.y = this.currentRot.y + t * 0.2;
    this.shell.rotation.x = -this.currentRot.x * 0.6 + t * 0.08;
    this.shell.rotation.y = -this.currentRot.y * 0.6 - t * 0.1;
    this.particles.rotation.y = t * 0.05;

    // Pulse amplitude reacts to state: idle breathes slowly, speaking/listening pulses faster.
    const amp = this.state === 0 ? 0.04 : 0.11;
    const speed = this.state === 0 ? 0.9 : this.state === 1 ? 3.2 : 2.2;
    const pulse = 1 + Math.sin(t * speed) * amp;
    this.core.scale.setScalar(pulse);
    this.shell.scale.setScalar(1 + Math.sin(t * speed * 0.7 + 1) * (amp * 0.6));

    const coreColor = this.state === 2 ? 0x34d399 : this.state === 1 ? 0x38bdf8 : 0x7c5cff;
    (this.core.material as THREE.MeshBasicMaterial).color.setHex(coreColor);

    this.renderer.render(this.scene, this.camera);
  };

  ngOnDestroy(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);
    this.renderer?.dispose();
    this.scene?.traverse((o) => {
      const any = o as unknown as { geometry?: THREE.BufferGeometry; material?: THREE.Material };
      any.geometry?.dispose();
      any.material?.dispose();
    });
  }
}
