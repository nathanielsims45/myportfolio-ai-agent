import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal,
} from '@angular/core';
import { ORBIT_CARDS, PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('orbitHost') orbitHost!: ElementRef<HTMLDivElement>;
  readonly profile = PROFILE;
  readonly cards = ORBIT_CARDS;
  hovered = signal<number | null>(null);
  readonly ringColors = ['#7c5cff', '#38bdf8', '#ffffff'];
  private raf = 0;
  private angles: number[] = [];
  private radii = [180, 260, 340];
  private speeds = [0.0006, -0.0004, 0.0003];
  private start = performance.now();

  constructor() {
    // distribute cards per ring
    const perRing = [4, 4, 4];
    let idx = 0;
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < perRing[r]; i++) {
        this.angles[idx] = (i / perRing[r]) * Math.PI * 2;
        idx++;
      }
    }
  }

  ngAfterViewInit(): void {
    this.raf = requestAnimationFrame(this.tick);
  }

  private tick = () => {
    const now = performance.now();
    const host = this.orbitHost?.nativeElement;
    if (host) {
      const cards = host.querySelectorAll<HTMLElement>('.orbit-card');
      const cx = host.clientWidth / 2;
      const cy = host.clientHeight / 2;
      const scale = Math.min(host.clientWidth, host.clientHeight) / 720;
      cards.forEach((el, i) => {
        const ring = this.cards[i].ring;
        this.angles[i] += this.speeds[ring] * 16;
        const r = this.radii[ring] * scale;
        const x = cx + Math.cos(this.angles[i]) * r;
        const y = cy + Math.sin(this.angles[i]) * r * 0.55;
        el.style.transform = `translate(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px) scale(${this.hovered() === i ? 1.18 : 1})`;
        el.style.zIndex = String(this.hovered() === i ? 30 : 10 + Math.round(y));
      });
      // connection line to hovered
      const line = host.querySelector<HTMLElement>('.orbit-line');
      if (line) {
        if (this.hovered() !== null) {
          const i = this.hovered()!;
          const ring = this.cards[i].ring;
          const r = this.radii[ring] * scale;
          const x = cx + Math.cos(this.angles[i]) * r;
          const y = cy + Math.sin(this.angles[i]) * r * 0.55;
          line.style.opacity = '1';
          line.style.width = `${Math.hypot(x - cx, y - cy)}px`;
          line.style.transform = `translate(${cx}px, ${cy}px) rotate(${Math.atan2(y - cy, x - cx)}rad)`;
        } else {
          line.style.opacity = '0';
        }
      }
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  onEnter(i: number) { this.hovered.set(i); }
  onLeave() { this.hovered.set(null); }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
  }
}
