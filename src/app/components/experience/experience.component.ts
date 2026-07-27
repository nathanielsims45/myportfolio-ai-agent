import { Component, signal } from '@angular/core';
import { EXPERIENCE } from '../../data/portfolio.data';
import { SectionHeaderComponent } from '../shared/section-header.component';

@Component({
  selector: 'app-experience',
  imports: [SectionHeaderComponent],
  template: `
    <section id="experience" class="section-pad relative">
      <div class="container-x">
        <app-section-header eyebrow="Experience" title="Career timeline"
          subtitle="Two decades across national labs, healthcare, and enterprise cloud." />

        <div class="relative max-w-4xl mx-auto">
          <div class="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style="background:linear-gradient(180deg, transparent, rgba(124,92,255,0.5), rgba(56,189,248,0.5), transparent)"></div>

          @for (item of experience; track item.company; let i = $index) {
            <div class="reveal relative mb-10 sm:grid sm:grid-cols-2 sm:gap-8"
              [class.sm:flex-row-reverse]="i % 2 === 1">
              <div [class.sm:col-start-1]="i % 2 === 0" [class.sm:col-start-2]="i % 2 === 1">
                <div class="glass glass-hover rounded-2xl p-6 ml-12 sm:ml-0 flex gap-4"
                  [class.sm:text-right]="i % 2 === 0" [class.sm:flex-row-reverse]="i % 2 === 0">
                  <div class="shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-[rgba(124,92,255,0.3)]">
                    <img [src]="item.image" [alt]="item.company" loading="lazy" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1" [class.sm:justify-end]="i % 2 === 0">
                    <span class="w-2.5 h-2.5 rounded-full" style="background:linear-gradient(135deg,#7c5cff,#38bdf8)"></span>
                    <span class="font-mono text-xs text-accent">{{ item.period }}</span>
                  </div>
                  <h3 class="text-xl font-bold text-text">{{ item.company }}</h3>
                  <div class="text-text-muted text-sm">{{ item.role }}</div>
                  <p class="mt-3 text-sm text-text-muted leading-relaxed">{{ item.summary }}</p>
                  <ul class="mt-3 space-y-1 text-sm text-text-muted">
                    @for (h of item.highlights; track h) {
                      <li class="flex gap-2" [class.sm:flex-row-reverse]="i % 2 === 0">
                        <span class="text-accent">▹</span><span>{{ h }}</span>
                      </li>
                    }
                  </ul>
                  </div>
                </div>
              </div>
              <div class="hidden sm:block"></div>
              <span class="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full"
                style="background:#7c5cff;box-shadow:0 0 12px #7c5cff"></span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  readonly experience = EXPERIENCE;
  expanded = signal<number | null>(0);
}
