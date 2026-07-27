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
                <div class="mt-5 flex items-center gap-4 text-sm">
                  <a href="#" class="text-text-muted hover:text-text transition-colors">GitHub →</a>
                  <a href="#" class="text-text-muted hover:text-text transition-colors">Live Demo →</a>
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
    .till-card .group img { transform: translateZ(20px); }
  `],
})
export class ProjectsComponent {
  readonly projects = PROJECTS;
}
