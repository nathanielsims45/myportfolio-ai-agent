import { Component } from '@angular/core';
import { SKILLS } from '../../data/portfolio.data';
import { SectionHeaderComponent } from '../shared/section-header.component';
import { CircularProgressComponent } from '../shared/circular-progress.component';
import { TiltDirective } from '../shared/tilt.directive';

@Component({
  selector: 'app-skills',
  imports: [SectionHeaderComponent, CircularProgressComponent, TiltDirective],
  template: `
    <section id="skills" class="section-pad relative">
      <div class="container-x">
        <app-section-header eyebrow="Skills" title="Skills dashboard"
          subtitle="Animated proficiency across the Microsoft stack I ship production systems with." />
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          @for (skill of skills; track skill.name) {
            <div appTilt class="reveal skill-card glass glass-hover rounded-2xl overflow-hidden group relative">
              <img [src]="skill.image" [alt]="skill.name" loading="lazy" decoding="async"
                class="absolute inset-0 w-full h-full object-cover opacity-25 transition-all duration-700 group-hover:opacity-45 group-hover:scale-110" />
              <div class="absolute inset-0"
                [style.background]="'linear-gradient(165deg, rgba(5,6,15,0.55) 0%, rgba(5,6,15,0.92) 65%), radial-gradient(circle at 50% 25%, ' + skill.accent + '38, transparent 60%)'"></div>
              <div class="relative p-5">
                <app-circular-progress [value]="skill.level" [name]="skill.name" />
                <div class="mt-3 h-1 rounded-full overflow-hidden" style="background:rgba(255,255,255,0.08)">
                  <span class="block h-full rounded-full transition-all duration-1000"
                    [style.width.%]="skill.level"
                    [style.background]="'linear-gradient(90deg, ' + skill.accent + ', #7dd3fc)'"></span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  readonly skills = SKILLS;
}
