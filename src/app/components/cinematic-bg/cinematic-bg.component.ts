import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cinematic-bg',
  template: `<canvas #c class="block w-full h-full"></canvas>`,
  styles: [`:host{display:block;width:100%;height:100%}`],
})
export class CinematicBgComponent implements AfterViewInit, OnDestroy {
  @ViewChild('c', { read: ElementRef }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private raf = 0;
  private disposed = false;
  private mouse = new THREE.Vector2(0, 0);
  private targetMouse = new THREE.Vector2(0, 0);
  private points!: THREE.Points;
  private lines!: THREE.LineSegments;
  private orbs!: THREE.Group;
  private stars!: THREE.Points;
  private clock = new THREE.Clock();
  private reduced = false;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.reduced = window.matchMedia('(max-width: 820px)').matches;
    this.zone.runOutsideAngular(() => this.init());
  }

  private init() {
    const canvas = this.canvasRef.nativeElement;
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !this.reduced,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.setSize(w, h);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x05060f, 0.06);

    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    this.camera.position.z = 18;

    this.buildConstellation();
    this.buildOrbs();
    this.buildStars();

    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);

    this.animate();
  }

  private buildConstellation() {
    const count = this.reduced ? 350 : 900;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const c1 = new THREE.Color(0x7c5cff);
    const c2 = new THREE.Color(0x38bdf8);
    const c3 = new THREE.Color(0xffffff);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 40;
      positions[i3 + 1] = (Math.random() - 0.5) * 24;
      positions[i3 + 2] = (Math.random() - 0.5) * 24;
      const t = Math.random();
      const col = t < 0.45 ? c1 : t < 0.85 ? c2 : c3;
      colors[i3] = col.r; colors[i3 + 1] = col.g; colors[i3 + 2] = col.b;
      sizes[i] = Math.random() * 1.6 + 0.4;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uTime;
        void main() {
          vColor = color;
          vec3 p = position;
          p.y += sin(uTime * 0.3 + position.x * 0.2) * 0.4;
          p.x += cos(uTime * 0.25 + position.y * 0.2) * 0.3;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = size * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor, a * 0.9);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    this.points = new THREE.Points(geo, mat);
    this.scene.add(this.points);

    // Connection lines (computed each frame for nearby pairs)
    const lineGeo = new THREE.BufferGeometry();
    const maxLines = this.reduced ? 300 : 900;
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    this.lines = new THREE.LineSegments(lineGeo, lineMat);
    this.scene.add(this.lines);
  }

  private buildOrbs() {
    this.orbs = new THREE.Group();
    const count = this.reduced ? 8 : 20;
    const palette = [0x7c5cff, 0x38bdf8, 0xffffff];
    for (let i = 0; i < count; i++) {
      const geo = new THREE.SphereGeometry(Math.random() * 0.6 + 0.25, 16, 16);
      const col = palette[i % palette.length];
      const mat = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 14 - 4);
      (mesh as any)._speed = Math.random() * 0.4 + 0.1;
      (mesh as any)._phase = Math.random() * Math.PI * 2;
      this.orbs.add(mesh);
    }
    this.scene.add(this.orbs);
  }

  private buildStars() {
    const count = this.reduced ? 60 : 160;
    const positions = new Float32Array(count * 3);
    const velocities: { x: number; y: number }[] = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 22 + 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;
      velocities.push({ x: (Math.random() - 0.5) * 0.04, y: -(Math.random() * 0.08 + 0.04) });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xffffff, size: 0.12, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    this.stars = new THREE.Points(geo, mat);
    (this.stars as any)._vel = velocities;
    this.scene.add(this.stars);
  }

  private updateLines() {
    const pos = (this.points.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array;
    const linePos = (this.lines.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array;
    const lineCol = (this.lines.geometry.getAttribute('color') as THREE.BufferAttribute).array as Float32Array;
    const maxLines = linePos.length / 6;
    let li = 0;
    const maxDist = this.reduced ? 2.4 : 2.0;
    const maxDist2 = maxDist * maxDist;
    const step = this.reduced ? 4 : 6;
    const c1 = new THREE.Color(0x7c5cff);
    const c2 = new THREE.Color(0x38bdf8);
    for (let i = 0; i < pos.length && li < maxLines; i += 3 * step) {
      const ax = pos[i], ay = pos[i + 1], az = pos[i + 2];
      for (let j = i + 3 * step; j < pos.length && li < maxLines; j += 3 * step) {
        const dx = ax - pos[j], dy = ay - pos[j + 1], dz = az - pos[j + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < maxDist2) {
          const a = 1 - d2 / maxDist2;
          linePos[li * 6] = ax; linePos[li * 6 + 1] = ay; linePos[li * 6 + 2] = az;
          linePos[li * 6 + 3] = pos[j]; linePos[li * 6 + 4] = pos[j + 1]; linePos[li * 6 + 5] = pos[j + 2];
          lineCol[li * 6] = c1.r * a; lineCol[li * 6 + 1] = c1.g * a; lineCol[li * 6 + 2] = c1.b * a;
          lineCol[li * 6 + 3] = c2.r * a; lineCol[li * 6 + 4] = c2.g * a; lineCol[li * 6 + 5] = c2.b * a;
          li++;
        }
      }
    }
    // clear unused
    for (let k = li * 6; k < linePos.length; k++) linePos[k] = 0;
    (this.lines.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (this.lines.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
    this.lines.geometry.setDrawRange(0, li * 2);
  }

  private updateStars() {
    const pos = (this.stars.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array;
    const vel = (this.stars as any)._vel as { x: number; y: number }[];
    for (let i = 0; i < vel.length; i++) {
      pos[i * 3] += vel[i].x;
      pos[i * 3 + 1] += vel[i].y;
      if (pos[i * 3 + 1] < -12) {
        pos[i * 3] = (Math.random() - 0.5) * 40;
        pos[i * 3 + 1] = 14;
      }
    }
    (this.stars.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
  }

  private animate = () => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.animate);
    const t = this.clock.getElapsedTime();

    this.mouse.lerp(this.targetMouse, 0.05);
    this.camera.position.x = this.mouse.x * 1.5;
    this.camera.position.y = this.mouse.y * 1.0;
    this.camera.lookAt(0, 0, 0);

    (this.points.material as THREE.ShaderMaterial).uniforms['uTime'].value = t;
    this.points.rotation.y = t * 0.02;

    if (Math.floor(t * 30) % 2 === 0) this.updateLines();

    this.orbs.children.forEach((o) => {
      const m = o as THREE.Mesh;
      const s = (m as any)._speed as number;
      const ph = (m as any)._phase as number;
      m.position.y += Math.sin(t * s + ph) * 0.005;
      m.position.x += Math.cos(t * s * 0.7 + ph) * 0.004;
      (m.material as THREE.MeshBasicMaterial).opacity = 0.18 + Math.sin(t * 0.8 + ph) * 0.12;
    });

    this.updateStars();

    this.renderer.render(this.scene, this.camera);
  };

  private onResize = () => {
    if (!this.renderer) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private onMouseMove = (e: MouseEvent) => {
    this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };

  ngOnDestroy(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.renderer?.dispose();
    this.scene?.traverse((o) => {
      const any = o as unknown as { geometry?: THREE.BufferGeometry; material?: THREE.Material };
      any.geometry?.dispose();
      any.material?.dispose();
    });
  }
}
