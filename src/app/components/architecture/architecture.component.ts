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
          <app-section-header eyebrow="Process" title="Scope to production flow"
            subtitle="How requirements and mockups become a maintained production build." />
          <div class="reveal glass rounded-3xl p-6 sm:p-8">
            <div class="flex flex-col items-center gap-3">
              @for (node of arch; track node.label; let last = $last) {
                <div class="arch-node glass glass-hover rounded-2xl overflow-hidden group relative w-full max-w-md">
                  <img [src]="node.image" [alt]="node.label" loading="lazy" decoding="async"
                    class="absolute inset-0 w-full h-full object-cover opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:scale-110" />
                  <div class="absolute inset-0" style="background:linear-gradient(100deg, rgba(5,6,15,0.94) 30%, rgba(5,6,15,0.6) 100%)"></div>
                  <div class="relative flex items-center gap-4 px-5 py-4">
                    <span class="node-icon grid place-items-center w-11 h-11 rounded-xl shrink-0 text-lg text-white">{{ node.icon }}</span>
                    <div class="text-left min-w-0">
                      <div class="font-semibold text-text">{{ node.label }}</div>
                      <div class="text-xs text-text-muted">{{ node.detail }}</div>
                    </div>
                  </div>
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
          <app-section-header eyebrow="Cloud" title="Microsoft cloud architecture"
            subtitle="Identity, data, apps, flows, and reporting on one Azure tenant." />
          <div class="reveal glass rounded-3xl p-6 sm:p-8">
            <div class="flex flex-col items-center gap-3">
              @for (node of cloud; track node.label; let last = $last) {
                <div class="arch-node glass glass-hover rounded-2xl overflow-hidden group relative w-full max-w-md">
                  <img [src]="node.image" [alt]="node.label" loading="lazy" decoding="async"
                    class="absolute inset-0 w-full h-full object-cover opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:scale-110" />
                  <div class="absolute inset-0" style="background:linear-gradient(100deg, rgba(5,6,15,0.94) 30%, rgba(5,6,15,0.6) 100%)"></div>
                  <div class="relative flex items-center gap-4 px-5 py-4">
                    <span class="node-icon grid place-items-center w-11 h-11 rounded-xl shrink-0 text-lg text-white">{{ node.icon }}</span>
                    <div class="text-left min-w-0">
                      <div class="font-semibold text-text">{{ node.label }}</div>
                      <div class="text-xs text-text-muted">{{ node.detail }}</div>
                    </div>
                  </div>
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
          <app-section-header eyebrow="Quality" title="Build practices"
            subtitle="What keeps an AI agent or full stack build maintainable after handoff." />
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            @for (item of codeQuality; track item.label) {
              <div appTilt class="reveal quality-card glass glass-hover rounded-xl p-4 flex items-start gap-3">
                <span class="node-icon grid place-items-center w-9 h-9 rounded-lg shrink-0 text-white">{{ item.icon }}</span>
                <div class="min-w-0">
                  <div class="text-sm font-semibold text-text leading-snug">{{ item.label }}</div>
                  <div class="mt-0.5 text-xs text-text-muted leading-snug">{{ item.detail }}</div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- AI solutions -->
        <div id="ai">
          <app-section-header eyebrow="Capabilities" title="What I build with the AI & cloud stack"
            subtitle="AI agents, Azure, React/Next.js, and .NET, end to end." />
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
                <div appTilt class="reveal glass glass-hover rounded-xl overflow-hidden group relative">
                  <img [src]="cert.image" [alt]="cert.name" loading="lazy" decoding="async"
                    class="absolute inset-0 w-full h-full object-cover opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:scale-110" />
                  <div class="absolute inset-0" style="background:linear-gradient(120deg, rgba(5,6,15,0.95) 35%, rgba(5,6,15,0.62) 100%)"></div>
                  <div class="relative p-4 flex items-center gap-3">
                    <span class="node-icon grid place-items-center w-10 h-10 rounded-lg shrink-0 text-white">✓</span>
                    <div class="min-w-0">
                      <div class="text-sm font-semibold text-text leading-snug">{{ cert.name }}</div>
                      <div class="mt-0.5 flex items-center gap-2 text-xs text-text-muted">
                        <span>{{ cert.issuer }}</span>
                        <span class="px-1.5 py-0.5 rounded font-mono text-[10px]"
                          style="background:rgba(124,92,255,0.15);border:1px solid rgba(124,92,255,0.3);color:#9b86ff">{{ cert.code }}</span>
                        <span class="font-mono text-[10px]">{{ cert.year }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div id="education">
            <app-section-header eyebrow="Education" title="Education" />
            <div class="space-y-3">
              @for (edu of education; track edu.school) {
                <div appTilt class="reveal glass glass-hover rounded-xl overflow-hidden group relative">
                  <img [src]="edu.image" [alt]="edu.school" loading="lazy" decoding="async"
                    class="absolute inset-0 w-full h-full object-cover opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:scale-110" />
                  <div class="absolute inset-0" style="background:linear-gradient(120deg, rgba(5,6,15,0.95) 30%, rgba(5,6,15,0.65) 100%)"></div>
                  <div class="relative p-5">
                    <div class="flex items-start justify-between gap-3">
                      <div class="min-w-0">
                        <div class="font-semibold text-text">{{ edu.school }}</div>
                        <div class="text-sm text-text-muted">{{ edu.degree }}</div>
                      </div>
                      <span class="shrink-0 font-mono text-[10px] px-2 py-1 rounded-full"
                        style="background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.28);color:#7dd3fc">{{ edu.period }}</span>
                    </div>
                    <p class="mt-3 text-xs text-text-muted leading-relaxed">{{ edu.detail }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .node-icon {
      background: linear-gradient(135deg, rgba(124,92,255,0.9), rgba(56,189,248,0.85));
      box-shadow: 0 8px 24px -10px rgba(124,92,255,0.8);
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .group:hover .node-icon,
    .quality-card:hover .node-icon { transform: rotate(-6deg) scale(1.08); }
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
