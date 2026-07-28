import {
  Component, AfterViewInit, ElementRef, ViewChild, signal, inject,
} from '@angular/core';
import { ScrollRevealService } from '../../services/scroll-reveal.service';
import { STATS, PROFILE } from '../../data/portfolio.data';
import { SectionHeaderComponent } from '../shared/section-header.component';
import { TiltDirective } from '../shared/tilt.directive';

@Component({
  selector: 'app-about',
  imports: [SectionHeaderComponent, TiltDirective],
  template: `
    <section id="about" class="section-pad relative">
      <div class="container-x">
        <app-section-header eyebrow="About" title="Enterprise architect, AI pragmatist"
          subtitle="Two decades shipping production Angular + Azure systems for regulated industries." />

        <div class="grid lg:grid-cols-2 gap-10 items-center">
          <div class="reveal relative">
            <div appTilt class="glass gradient-border rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto relative">
              <img [src]="profile.image" [alt]="profile.name" loading="lazy" decoding="async"
                width="585" height="905"
                class="w-full h-full object-cover" />
              <div class="absolute inset-0"
                style="background:linear-gradient(180deg, transparent 40%, rgba(5,6,15,0.85) 100%), radial-gradient(circle at var(--glow-x,50%) var(--glow-y,50%), rgba(124,92,255,0.35), transparent 55%)"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <div class="text-xs eyebrow">{{ profile.title }}</div>
                <div class="mt-1 font-semibold text-text">{{ profile.name }}</div>
              </div>
            </div>
          </div>

          <div class="reveal space-y-5">
            <p class="text-lg text-text-muted leading-relaxed">
              I'm {{ profile.name }}, a senior Angular architect specializing in
              enterprise platforms for healthcare, FinTech, and government. I pair
              pixel-perfect Angular frontends with Azure cloud architecture and
              AI-augmented services — building systems that are fast, accessible,
              and built to scale across dozens of product teams.
            </p>
            <p class="text-text-muted leading-relaxed">
              My work spans HIPAA-compliant patient portals, real-time financial
              dashboards, and Azure OpenAI agent platforms. I care deeply about
              performance budgets, design systems, and shipping software that
              feels like a premium SaaS product.
            </p>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              @for (stat of stats; track stat.label) {
                <div appTilt class="glass glass-hover rounded-2xl p-4 text-center">
                  <div class="text-3xl font-bold gradient-text">
                    {{ counts()[stat.label] }}{{ stat.suffix }}
                  </div>
                  <div class="mt-1 text-xs text-text-muted">{{ stat.label }}</div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent implements AfterViewInit {
  private reveal = inject(ScrollRevealService);
  readonly stats = STATS;
  readonly profile = PROFILE;
  counts = signal<Record<string, number>>({});

  @ViewChild('host', { read: ElementRef }) host?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.animateCounters();
  }

  private animateCounters() {
    const out: Record<string, number> = {};
    const duration = 1600;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      for (const s of STATS) out[s.label] = Math.round(s.value * eased);
      this.counts.set({ ...out });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
