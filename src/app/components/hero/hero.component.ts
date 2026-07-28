import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, signal,
} from '@angular/core';
import { ORBIT_CARDS, PROFILE } from '../../data/portfolio.data';

/** Peak card scale on hover — orbit radii reserve room for this. */
const HOVER_SCALE = 1.22;
/** Nominal card height used for vertical bounds. */
const CARD_H = 42;
/** Amplitude of the per-card vertical bob. */
const BOB_PX = 4;

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
  private raf = 0;
  private angles: number[] = [];
  private radii = [180, 260, 340];
  private speeds = [0.0011, -0.0008, 0.0006];
  private start = performance.now();
  /** eased 0→1 ramp applied to orbital speed while a card is hovered */
  private slowdown = 1;

  constructor() {
    // distribute cards per ring
    const perRing = [4, 4, 4];
    let idx = 0;
    for (let r = 0; r < 3; r++) {
      // Offset each ring so cards don't line up in spokes across rings.
      const phase = (r / 3) * ((Math.PI * 2) / perRing[r]);
      for (let i = 0; i < perRing[r]; i++) {
        this.angles[idx] = (i / perRing[r]) * Math.PI * 2 + phase;
        idx++;
      }
    }
  }

  ngAfterViewInit(): void {
    this.raf = requestAnimationFrame(this.tick);
  }

  /** Widest card, measured once and cached — offsetWidth is layout-thrashing. */
  private cardW = 0;
  private maxCardWidth(cards: NodeListOf<HTMLElement>): number {
    if (!this.cardW) {
      cards.forEach((el) => {
        this.cardW = Math.max(this.cardW, el.offsetWidth);
      });
    }
    return this.cardW;
  }

  private tick = () => {
    const now = performance.now();
    const host = this.orbitHost?.nativeElement;
    if (host) {
      const cards = host.querySelectorAll<HTMLElement>('.orbit-card');
      const w = host.clientWidth;
      const h = host.clientHeight;
      const cx = w / 2;
      const cy = h / 2;

      // Derive orbit radii from the container so cards always stay inside it.
      // Reserve room for the widest card + its hover scale so nothing clips out.
      const maxCardW = this.maxCardWidth(cards);
      // Half-extent of a card at peak (hover) scale, plus a small breathing gap.
      // If the container is too narrow to fit a full-size card on both sides of
      // the orbit, shrink the cards rather than letting them spill outside.
      const fitScale = Math.min(1, (w / 2 - 16) / ((maxCardW * HOVER_SCALE) / 2 + 88));
      const cardScale = Math.max(0.72, fitScale);
      host.style.setProperty('--card-scale', String(cardScale));

      const padX = (maxCardW * cardScale * HOVER_SCALE) / 2 + 8;
      const padY = (CARD_H * cardScale * HOVER_SCALE) / 2 + BOB_PX + 8;
      const rxMax = Math.max(60, w / 2 - padX);
      const ryMax = Math.max(50, h / 2 - padY);
      const rings = this.radii.length;

      // Share the computed ellipse with CSS so the rings track the real orbits.
      host.style.setProperty('--rx', `${rxMax}px`);
      host.style.setProperty('--ry', `${ryMax}px`);

      // Ease orbital speed down while inspecting a card, back up on leave.
      const target = this.hovered() !== null ? 0.15 : 1;
      this.slowdown += (target - this.slowdown) * 0.08;

      const t = (now - this.start) / 1000;

      cards.forEach((el, i) => {
        const ring = this.cards[i].ring;
        this.angles[i] += this.speeds[ring] * 16 * this.slowdown;
        const a = this.angles[i];

        // Innermost ring sits at 55% of the outermost, scaling out evenly.
        const f = rings === 1 ? 1 : 0.55 + (ring / (rings - 1)) * 0.45;
        const rx = rxMax * f;
        const ry = ryMax * f;

        // Gentle per-card vertical bob, phase-offset so they don't move in lockstep.
        const bob = Math.sin(t * 1.4 + i * 0.9) * BOB_PX;

        const x = cx + Math.cos(a) * rx;
        const y = cy + Math.sin(a) * ry + bob;

        // depth: sin(a) runs -1 (far/back) → 1 (near/front)
        const depth = (Math.sin(a) + 1) / 2;
        const isHover = this.hovered() === i;
        const scaleZ = (isHover ? HOVER_SCALE : 0.82 + depth * 0.26) * cardScale;
        const blur = isHover ? 0 : (1 - depth) * 1.4;

        el.style.transform =
          `translate(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px) scale(${scaleZ})`;
        el.style.zIndex = String(isHover ? 30 : 10 + Math.round(depth * 20));

        // Dimming is applied here (not via CSS) because these inline styles are
        // rewritten every frame and would otherwise override the stylesheet.
        const dimmed = this.hovered() !== null && !isHover;
        const depthOpacity = 0.62 + depth * 0.38;
        el.style.opacity = String(isHover ? 1 : dimmed ? depthOpacity * 0.4 : depthOpacity);
        const totalBlur = dimmed ? blur + 0.8 : blur;
        const parts: string[] = [];
        if (totalBlur > 0.15) parts.push(`blur(${totalBlur.toFixed(2)}px)`);
        if (dimmed) parts.push('saturate(0.55)');
        el.style.filter = parts.join(' ');
      });
      // connection line to hovered
      const line = host.querySelector<HTMLElement>('.orbit-line');
      if (line) {
        if (this.hovered() !== null) {
          const i = this.hovered()!;
          const ring = this.cards[i].ring;
          const f = rings === 1 ? 1 : 0.55 + (ring / (rings - 1)) * 0.45;
          const bob = Math.sin(t * 1.4 + i * 0.9) * BOB_PX;
          const x = cx + Math.cos(this.angles[i]) * rxMax * f;
          const y = cy + Math.sin(this.angles[i]) * ryMax * f + bob;
          line.style.setProperty('--line-tech', this.cards[i].color);
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

  @HostListener('window:resize')
  onResize() {
    // Card widths change with breakpoints; re-measure on the next frame.
    this.cardW = 0;
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
  }
}
