import { Component } from '@angular/core';
import { ARCHITECTURE_FLOW, CLOUD_FLOW, AI_SOLUTIONS, CODE_QUALITY, CERTIFICATIONS, EDUCATION } from '../../data/portfolio.data';
import { SectionHeaderComponent } from '../shared/section-header.component';
import { TiltDirective } from '../shared/tilt.directive';

@Component({
  selector: 'app-architecture',
  imports: [SectionHeaderComponent, TiltDirective],
  template: `
    <section id="architecture" class="section-pad relative">
      <div class="container-x space-y-20">
        <!-- Enterprise architecture -->
        <div>
          <app-section-header eyebrow="Architecture" title="Enterprise architecture flow"
            subtitle="Animated end-to-end flow from microservices to AI services." />
          <div class="reveal glass rounded-3xl p-8">
            <div class="flex flex-col items-center gap-3">
              @for (node of arch; track node; let last = $last) {
                <div class="arch-node glass glass-hover rounded-xl px-6 py-3 text-center min-w-[220px]">
                  <span class="font-semibold text-text">{{ node }}</span>
                </div>
                @if (!last) {
                  <div class="arch-arrow"></div>
                }
              }
            </div>
          </div>
        </div>

        <!-- Cloud architecture -->
        <div>
          <app-section-header eyebrow="Cloud" title="Azure cloud architecture"
            subtitle="Animated data flow across managed Azure services." />
          <div class="reveal glass rounded-3xl p-8">
            <div class="flex flex-col items-center gap-3">
              @for (node of cloud; track node; let last = $last) {
                <div class="arch-node glass glass-hover rounded-xl px-6 py-3 text-center min-w-[220px]">
                  <span class="font-semibold text-text">{{ node }}</span>
                </div>
                @if (!last) {
                  <div class="arch-arrow"></div>
                }
              }
            </div>
          </div>
        </div>

        <!-- Code quality -->
        <div>
          <app-section-header eyebrow="Quality" title="Angular code quality"
            subtitle="Practices I enforce across every codebase I own." />
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            @for (item of codeQuality; track item) {
              <div class="reveal glass glass-hover rounded-xl p-4 text-sm font-medium text-text">{{ item }}</div>
            }
          </div>
        </div>

        <!-- AI solutions -->
        <div id="ai">
          <app-section-header eyebrow="AI" title="AI solutions"
            subtitle="Production AI patterns I ship on Azure." />
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            @for (ai of aiSolutions; track ai.title) {
              <div appTilt class="reveal glass glass-hover rounded-2xl overflow-hidden group">
                <div class="relative h-32 overflow-hidden">
                  <img [src]="ai.image" [alt]="ai.title" loading="lazy"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div class="absolute inset-0" style="background:linear-gradient(180deg, transparent 30%, rgba(5,6,15,0.9) 100%)"></div>
                  <div class="absolute top-3 left-3 text-accent text-lg">✦</div>
                </div>
                <div class="p-5">
                  <h3 class="font-semibold text-text">{{ ai.title }}</h3>
                  <p class="mt-1 text-sm text-text-muted leading-relaxed">{{ ai.desc }}</p>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Certifications + Education -->
        <div class="grid lg:grid-cols-2 gap-10">
          <div>
            <app-section-header eyebrow="Credentials" title="Certifications" />
            <div class="grid sm:grid-cols-2 gap-3">
              @for (cert of certifications; track cert.name) {
                <div class="reveal glass glass-hover rounded-xl p-4 flex items-center gap-3">
                  <span class="grid place-items-center w-9 h-9 rounded-lg"
                    style="background:linear-gradient(135deg,#7c5cff,#38bdf8)">✓</span>
                  <div>
                    <div class="text-sm font-semibold text-text">{{ cert.name }}</div>
                    <div class="text-xs text-text-muted">{{ cert.issuer }}</div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div id="education">
            <app-section-header eyebrow="Education" title="Education" />
            <div class="space-y-3">
              @for (edu of education; track edu.school) {
                <div class="reveal glass glass-hover rounded-xl p-5">
                  <div class="font-semibold text-text">{{ edu.school }}</div>
                  <div class="text-sm text-text-muted">{{ edu.degree }}</div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .arch-arrow {
      width: 2px; height: 22px;
      background: linear-gradient(180deg, rgba(124,92,255,0.8), rgba(56,189,248,0.4));
      position: relative;
    }
    .arch-arrow::after {
      content: ""; position: absolute; bottom: -3px; left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 6px; height: 6px;
      border-right: 2px solid rgba(56,189,248,0.7);
      border-bottom: 2px solid rgba(56,189,248,0.7);
    }
  `],
})
export class ArchitectureComponent {
  readonly arch = ARCHITECTURE_FLOW;
  readonly cloud = CLOUD_FLOW;
  readonly aiSolutions = AI_SOLUTIONS;
  readonly codeQuality = CODE_QUALITY;
  readonly certifications = CERTIFICATIONS;
  readonly education = EDUCATION;
}
