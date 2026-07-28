import { Component } from '@angular/core';
import { PROJECTS } from '../../data/portfolio.data';
import { SectionHeaderComponent } from '../shared/section-header.component';
import { TiltDirective } from '../shared/tilt.directive';

@Component({
  selector: 'app-projects',
  imports: [SectionHeaderComponent, TiltDirective],
  template: `
    <section id="projects" class="section-pad relative">
      <div class="container-x">
        <app-section-header eyebrow="Projects" title="Selected work"
          subtitle="Enterprise platforms across healthcare, FinTech, and AI." />

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of projects; track project.title) {
            <article appTilt class="reveal glass glass-hover rounded-2xl overflow-hidden group tilt-card">
              <div class="relative h-48 overflow-hidden">
                <img [src]="project.image" [alt]="project.title" loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0"
                  [style.background]="'linear-gradient(180deg, transparent 30%, rgba(5,6,15,0.92) 100%), radial-gradient(circle at var(--glow-x,50%) var(--glow-y,50%), ' + project.accent + '40, transparent 50%)'"></div>
                <div class="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono"
                  style="background:rgba(5,6,15,0.7);border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(8px)">
                  {{ project.category }}
                </div>
              </div>
              <div class="p-5">
                <h3 class="text-lg font-bold text-text">{{ project.title }}</h3>
                <p class="mt-2 text-sm text-text-muted leading-relaxed">{{ project.description }}</p>
                <div class="mt-4 flex flex-wrap gap-1.5">
                  @for (t of project.tech; track t) {
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-mono"
                      style="background:rgba(124,92,255,0.12);border:1px solid rgba(124,92,255,0.25);color:#9b86ff">{{ t }}</span>
                  }
                </div>
                <div class="mt-5 pt-4 border-t border-[rgba(124,92,255,0.14)]">
                  <a [href]="project.repo" target="_blank" rel="noopener noreferrer"
                    class="repo-link inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors">
                    <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
                      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
                    </svg>
                    View on GitHub
                    <span class="arrow transition-transform duration-300">→</span>
                  </a>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .tilt-card { transform-style: preserve-3d; }
    .repo-link:hover .arrow { transform: translateX(3px); }
  `],
})
export class ProjectsComponent {
  readonly projects = PROJECTS;
}
