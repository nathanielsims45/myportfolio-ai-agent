import { Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="border-t border-[rgba(124,92,255,0.18)] py-10 mt-10">
      <div class="container-x px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
        <div class="flex items-center gap-2">
          <span class="grid place-items-center w-7 h-7 rounded-md text-xs font-bold text-white"
            style="background:linear-gradient(135deg,#7c5cff,#38bdf8)">NS</span>
          <span>{{ profile.name }} · {{ profile.title }}</span>
        </div>
        <div class="flex items-center gap-5 font-mono text-xs">
          <a [href]="profile.github" class="hover:text-text">GitHub</a>
          <a [href]="profile.linkedin" class="hover:text-text">LinkedIn</a>
          <a [href]="'mailto:' + profile.email" class="hover:text-text">Email</a>
        </div>
        <div class="font-mono text-xs">© 2026 · Built with Angular</div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly profile = PROFILE;
}
