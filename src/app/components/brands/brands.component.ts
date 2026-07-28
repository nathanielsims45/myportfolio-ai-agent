import { Component } from '@angular/core';
import { BRANDS } from '../../data/portfolio.data';
import { SectionHeaderComponent } from '../shared/section-header.component';

@Component({
  selector: 'app-brands',
  imports: [SectionHeaderComponent],
  template: `
    <section id="brands" class="section-pad relative">
      <div class="container-x">
        <app-section-header eyebrow="Brands" title="Products I've built frontends for"
          subtitle="Crypto exchanges, wallets, token dashboards, and casino platforms." />

        <!-- Two rows scrolling opposite ways. Each row duplicates its logos so
             the translate loop has no visible seam. -->
        <div class="reveal marquee-mask space-y-4">
          <div class="marquee">
            <div class="marquee-track">
              @for (b of doubled; track $index) {
                <div class="brand-chip glass">
                  <img [src]="b.image" [alt]="b.name" loading="lazy" decoding="async" />
                </div>
              }
            </div>
          </div>
          <div class="marquee">
            <div class="marquee-track reverse">
              @for (b of doubledReverse; track $index) {
                <div class="brand-chip glass">
                  <img [src]="b.image" [alt]="b.name" loading="lazy" decoding="async" />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    /* Fade the strip out at both edges instead of cutting hard. */
    .marquee-mask {
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
      mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    }
    .marquee { overflow: hidden; }
    .marquee-track {
      display: flex;
      gap: 1rem;
      width: max-content;
      animation: slide 42s linear infinite;
    }
    .marquee-track.reverse { animation-duration: 54s; animation-direction: reverse; }
    .marquee:hover .marquee-track { animation-play-state: paused; }

    /* Track holds the list twice, so -50% lands exactly on the copy. */
    @keyframes slide {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    .brand-chip {
      flex: 0 0 auto;
      width: 170px; height: 96px;
      display: grid; place-items: center;
      padding: 1.1rem 1.25rem;
      border-radius: 1rem;
      overflow: hidden;
      transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
    }
    .brand-chip img {
      /* The source PNGs are square canvases with the mark in a narrow band.
         Percentage max-height does not resolve reliably against the grid
         track here, so bound the box in explicit px and let contain fit. */
      width: 100%;
      height: 62px;
      object-fit: contain;
      /* Source logos are dark-on-white; invert so they read on the dark theme. */
      filter: brightness(0) invert(1) opacity(0.62);
      transition: filter 0.35s, transform 0.35s;
    }
    .brand-chip:hover {
      border-color: rgba(124,92,255,0.55);
      box-shadow: 0 0 34px -12px rgba(124,92,255,0.8);
      transform: translateY(-3px);
    }
    .brand-chip:hover img { filter: none; transform: scale(1.06); }

    @media (min-width: 640px) {
      .brand-chip { width: 200px; height: 108px; }
      .brand-chip img { height: 74px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .marquee-track { animation: none; }
      .marquee { overflow-x: auto; }
    }
  `],
})
export class BrandsComponent {
  readonly doubled = [...BRANDS, ...BRANDS];
  /** Second row starts from the other end so the two rows never mirror. */
  readonly doubledReverse = (() => {
    const half = [...BRANDS].reverse();
    return [...half, ...half];
  })();
}
