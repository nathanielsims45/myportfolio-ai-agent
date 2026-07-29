import { Component, signal } from '@angular/core';
import { PROJECTS, ProjectItem } from '../../data/portfolio.data';
import { SectionHeaderComponent } from '../shared/section-header.component';
import { TiltDirective } from '../shared/tilt.directive';
import { ProjectDetailComponent } from './project-detail.component';

@Component({
  selector: 'app-projects',
  imports: [SectionHeaderComponent, TiltDirective, ProjectDetailComponent],
  template: `
    <section id="projects" class="section-pad relative">
      <div class="container-x">
        <app-section-header eyebrow="Projects" title="Selected work"
          subtitle="Power Platform, Azure, and .NET builds across enterprise, healthcare, and nonprofit clients. Click any project for the full story." />

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of projects; track project.title) {
            <article appTilt
              class="reveal glass glass-hover rounded-2xl overflow-hidden group tilt-card cursor-pointer"
              (click)="selected.set(project)"
              (keydown.enter)="selected.set(project)"
              tabindex="0" role="button" [attr.aria-label]="'Open ' + project.title + ' details'"
            >
              <div class="relative h-48 overflow-hidden">
                <img [src]="project.image" [alt]="project.title" loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0"
                  [style.background]="'linear-gradient(180deg, transparent 30%, rgba(5,6,15,0.92) 100%), radial-gradient(circle at var(--glow-x,50%) var(--glow-y,50%), ' + project.accent + '40, transparent 50%)'"></div>
                <div class="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono"
                  style="background:rgba(5,6,15,0.7);border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(8px)">
                  {{ project.category }}
                </div>
                <div class="view-hint absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span class="px-4 py-2 rounded-full text-xs font-semibold text-white"
                    style="background:rgba(5,6,15,0.65);border:1px solid rgba(255,255,255,0.2);backdrop-filter:blur(6px)">
                    View project →
                  </span>
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
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <app-project-detail [project]="selected()" (close)="selected.set(null)" />
  `,
  styles: [`
    .tilt-card { transform-style: preserve-3d; }
    .view-hint { pointer-events: none; }
  `],
})
export class ProjectsComponent {
  readonly projects = PROJECTS;
  readonly selected = signal<ProjectItem | null>(null);
}
