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
          <a [href]="profile.github" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(124,92,255,0.28)] hover:text-text hover:border-[rgba(124,92,255,0.6)] transition-colors">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
            </svg>
            {{ profile.githubHandle }}
          </a>
        </div>
        <div class="font-mono text-xs">© 2026 · Built with Angular</div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly profile = PROFILE;
}
