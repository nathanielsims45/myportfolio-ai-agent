import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, signal,
} from '@angular/core';
import { ORBIT_CARDS, PROFILE } from '../../data/portfolio.data';
import { SectionHeaderComponent } from '../shared/section-header.component';

/** Peak card scale on hover — orbit radii reserve room for this. */
const HOVER_SCALE = 1.22;
/** Fallback card height before the first measurement lands. */
const CARD_H = 42;
/** Amplitude of the per-card vertical bob. */
const BOB_PX = 4;
/** Frames to keep re-measuring card size before trusting the cache (~2s). */
const MEASURE_FRAMES = 120;
/** How often a random card auto-focuses itself. */
const AUTO_EVERY_MS = 10_000;
/** How long each auto-focus lasts. */
const AUTO_HOLD_MS = 2_000;

@Component({
  selector: 'app-tech-stack',
  imports: [SectionHeaderComponent],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
})
export class TechStackComponent implements AfterViewInit, OnDestroy {
  @ViewChild('orbitHost') orbitHost!: ElementRef<HTMLDivElement>;
  readonly profile = PROFILE;
  readonly cards = ORBIT_CARDS;
  hovered = signal<number | null>(null);

  private raf = 0;
  private angles: number[] = [];
  private radii = [180, 260, 340];
  private speeds = [0.0011, -0.0008, 0.0006];
  /** Per-ring eccentricity: how far from a circle each orbit is squashed. */
  private ringEcc = [0.62, 0.44, 0.78];
  /** Per-ring tilt in radians, so orbits are not axis-aligned. */
  private ringTilt = [-0.22, 0.16, -0.09];
  private start = performance.now();
  /** eased ramp applied to orbital speed while a card is focused */
  private slowdown = 1;

  constructor() {
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
    this.startAutoFocus();
  }

  /** Index currently focused by the timer, so real input can override it. */
  private autoIndex: number | null = null;
  private autoTimer?: ReturnType<typeof setInterval>;
  private holdTimer?: ReturnType<typeof setTimeout>;

  private startAutoFocus(): void {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.autoTimer = setInterval(() => {
      // Never fight a real hover/tap.
      if (this.hovered() !== null && this.autoIndex === null) return;
      let next = Math.floor(Math.random() * this.cards.length);
      if (this.cards.length > 1 && next === this.autoIndex) {
        next = (next + 1) % this.cards.length;
      }
      this.autoIndex = next;
      this.hovered.set(next);
      this.holdTimer = setTimeout(() => {
        // Only clear if the timer's own pick is still showing.
        if (this.autoIndex !== null && this.hovered() === this.autoIndex) {
          this.hovered.set(null);
        }
        this.autoIndex = null;
      }, AUTO_HOLD_MS);
    }, AUTO_EVERY_MS);
  }

  private cardW = 0;
  private cardH = 0;
  private measured = 0;
  private measureCards(cards: NodeListOf<HTMLElement>): void {
    // Web fonts can land after the first frames and change card widths, so
    // re-measure for a short window before trusting the cached value.
    if (this.cardW && this.measured > MEASURE_FRAMES) return;
    let w = 0;
    let h = 0;
    cards.forEach((el) => {
      w = Math.max(w, el.offsetWidth);
      h = Math.max(h, el.offsetHeight);
    });
    if (w > 0) {
      this.cardW = w;
      this.cardH = h;
      this.measured++;
    }
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

      this.measureCards(cards);
      const maxCardW = this.cardW || 150;
      const maxCardH = this.cardH || CARD_H;

      // If the container is too narrow to fit a full-size card on both sides
      // of the orbit, shrink the cards rather than letting them spill out.
      const fitScale = Math.min(1, (w / 2 - 16) / ((maxCardW * HOVER_SCALE) / 2 + 88));
      const cardScale = Math.max(0.72, fitScale);

      const padX = (maxCardW * cardScale * HOVER_SCALE) / 2 + 8;
      const padY = (maxCardH * cardScale * HOVER_SCALE) / 2 + BOB_PX + 8;
      // Tilting and per-ring eccentricity both push points outward, so solve
      // for the largest radii where every ring still fits the padded box.
      const availX = Math.max(40, w / 2 - padX);
      const availY = Math.max(40, h / 2 - padY);
      const maxEcc = Math.max(...this.ringEcc) / 0.62;
      let rxMax = availX;
      let ryMax = Math.min(availY, rxMax * 0.62);
      for (const [ri, tilt] of this.ringTilt.entries()) {
        const f = this.radii.length === 1 ? 1 : 0.55 + (ri / (this.radii.length - 1)) * 0.45;
        const e = this.ringEcc[ri] / 0.62;
        const c = Math.abs(Math.cos(tilt));
        const si = Math.abs(Math.sin(tilt));
        // half-extents of this tilted ellipse, per axis
        const exX = f * (c + 0.62 * e * si);
        const exY = f * (si + 0.62 * e * c);
        rxMax = Math.min(rxMax, availX / exX);
        ryMax = Math.min(ryMax, (availY / exY) * 0.62);
      }
      ryMax = Math.min(ryMax, rxMax * 0.62, availY / maxEcc);
      const rings = this.radii.length;

      // Share the computed ellipse with CSS so the rings track the real orbits.
      host.style.setProperty('--rx', `${rxMax}px`);
      host.style.setProperty('--ry', `${ryMax}px`);

      const target = this.hovered() !== null ? 0.15 : 1;
      this.slowdown += (target - this.slowdown) * 0.08;

      const t = (now - this.start) / 1000;

      cards.forEach((el, i) => {
        const ring = this.cards[i].ring;

        // Sweep faster near the "front" of the orbit and slower at the back,
        // like an eccentric orbit, so motion never reads as a uniform spin.
        const ease = 1 + 0.55 * Math.sin(this.angles[i] + i * 0.7);
        this.angles[i] += this.speeds[ring] * 16 * this.slowdown * ease;
        const a = this.angles[i];

        // Innermost ring sits at 55% of the outermost, scaling out evenly.
        const f = rings === 1 ? 1 : 0.55 + (ring / (rings - 1)) * 0.45;

        // Eccentric, tilted ellipse per ring — not a plain circle.
        const ex = Math.cos(a) * rxMax * f;
        const ey = Math.sin(a) * ryMax * f * (this.ringEcc[ring] / 0.62);
        const tilt = this.ringTilt[ring];
        const bob = Math.sin(t * 1.4 + i * 0.9) * BOB_PX;
        const x = cx + ex * Math.cos(tilt) - ey * Math.sin(tilt);
        const y = cy + ex * Math.sin(tilt) + ey * Math.cos(tilt) + bob;

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

      const line = host.querySelector<HTMLElement>('.orbit-line');
      if (line) {
        if (this.hovered() !== null) {
          const i = this.hovered()!;
          const ring = this.cards[i].ring;
          const f = rings === 1 ? 1 : 0.55 + (ring / (rings - 1)) * 0.45;
          const a = this.angles[i];
          const ex = Math.cos(a) * rxMax * f;
          const ey = Math.sin(a) * ryMax * f * (this.ringEcc[ring] / 0.62);
          const tilt = this.ringTilt[ring];
          const bob = Math.sin(t * 1.4 + i * 0.9) * BOB_PX;
          const x = cx + ex * Math.cos(tilt) - ey * Math.sin(tilt);
          const y = cy + ex * Math.sin(tilt) + ey * Math.cos(tilt) + bob;
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

  /** Real input takes over from the auto-focus timer. */
  private cancelAuto() {
    clearTimeout(this.holdTimer);
    this.autoIndex = null;
  }

  onEnter(i: number) { this.cancelAuto(); this.hovered.set(i); }
  onLeave() { this.hovered.set(null); }

  /** Touch devices never fire hover, so tapping toggles focus instead. */
  onTap(i: number) {
    this.cancelAuto();
    this.hovered.set(this.hovered() === i ? null : i);
  }

  @HostListener('window:resize')
  onResize() {
    // Card sizes change with breakpoints; re-measure on the next frame.
    this.cardW = 0;
    this.cardH = 0;
    this.measured = 0;
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    clearInterval(this.autoTimer);
    clearTimeout(this.holdTimer);
  }
}
