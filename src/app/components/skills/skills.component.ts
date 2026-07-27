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
          subtitle="Animated proficiency across the stack I ship production systems with." />
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          @for (skill of skills; track skill.name) {
            <div appTilt class="reveal glass glass-hover rounded-2xl p-5">
              <app-circular-progress [value]="skill.level" [name]="skill.name" />
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
