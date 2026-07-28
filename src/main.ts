import { Component, AfterViewInit, inject, NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NavbarComponent } from './app/components/navbar/navbar.component';
import { CinematicBgComponent } from './app/components/cinematic-bg/cinematic-bg.component';
import { HeroComponent } from './app/components/hero/hero.component';
import { TechStackComponent } from './app/components/tech-stack/tech-stack.component';
import { BrandsComponent } from './app/components/brands/brands.component';
import { AboutComponent } from './app/components/about/about.component';
import { SkillsComponent } from './app/components/skills/skills.component';
import { ExperienceComponent } from './app/components/experience/experience.component';
import { ProjectsComponent } from './app/components/projects/projects.component';
import { ArchitectureComponent } from './app/components/architecture/architecture.component';
import { ChartsComponent } from './app/components/charts/charts.component';
import { ContactComponent } from './app/components/contact/contact.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { ScrollRevealService } from './app/services/scroll-reveal.service';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent, CinematicBgComponent, HeroComponent, TechStackComponent, BrandsComponent, AboutComponent,
    SkillsComponent, ExperienceComponent, ProjectsComponent,
    ArchitectureComponent, ChartsComponent, ContactComponent, FooterComponent,
  ],
  template: `
    <div class="relative min-h-screen">
      <div class="fixed inset-0 z-0">
        <app-cinematic-bg />
      </div>
      <div class="relative z-10">
        <app-navbar />
        <main>
          <app-hero />
          <app-tech-stack />
          <app-brands />
          <app-about />
          <app-skills />
          <app-experience />
          <app-projects />
          <app-architecture />
          <app-charts />
          <app-contact />
        </main>
        <app-footer />
      </div>
    </div>
  `,
})
export class App implements AfterViewInit {
  private reveal = inject(ScrollRevealService);
  private zone = inject(NgZone);

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.reveal.observe(document.body));
    });
  }
}

bootstrapApplication(App);
