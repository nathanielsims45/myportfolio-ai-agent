import {
  Component, EventEmitter, Input, Output, OnChanges, OnDestroy, SimpleChanges,
  HostListener, signal,
} from '@angular/core';
import { ProjectItem } from '../../data/portfolio.data';

@Component({
  selector: 'app-project-detail',
  template: `
    @if (project) {
      <div class="overlay" (click)="onBackdrop($event)">
        <!-- Slowly drifting, cross-fading gallery images behind the panel. -->
        <div class="bg-flow" aria-hidden="true">
          @for (src of project.gallery; track src; let i = $index) {
            <div class="bg-layer" [class.is-active]="i === active()"
              [style.background-image]="'url(' + src + ')'"
              [style.animation-delay.ms]="i * 200"></div>
          }
          <div class="bg-scrim" [style.background]="scrimGradient()"></div>
        </div>

        <div class="panel glass gradient-border" role="dialog" aria-modal="true" [attr.aria-label]="project.title">
          <button class="close-btn" (click)="close.emit()" aria-label="Close project detail">✕</button>

          <div class="panel-scroll">
            <div class="px-2.5 py-1 rounded-full text-[10px] font-mono inline-block mb-4"
              style="background:rgba(5,6,15,0.7);border:1px solid rgba(255,255,255,0.15)">
              {{ project.category }}
            </div>

            <h2 class="text-3xl sm:text-4xl font-bold text-text tracking-tight">{{ project.title }}</h2>
            <p class="mt-3 text-text-muted leading-relaxed max-w-2xl">{{ project.detail }}</p>

            <div class="mt-6 flex flex-wrap gap-1.5">
              @for (t of project.tech; track t) {
                <span class="px-2.5 py-1 rounded-md text-xs font-mono"
                  style="background:rgba(124,92,255,0.12);border:1px solid rgba(124,92,255,0.25);color:#9b86ff">{{ t }}</span>
              }
            </div>

            <div class="mt-8">
              <div class="eyebrow text-xs mb-3">What I built</div>
              <ul class="space-y-2.5">
                @for (h of project.highlights; track h) {
                  <li class="flex items-start gap-2.5 text-sm text-text-muted leading-relaxed">
                    <span class="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" [style.background]="project.accent"></span>
                    {{ h }}
                  </li>
                }
              </ul>
            </div>

            @if (project.gallery.length > 1) {
              <div class="mt-8">
                <div class="eyebrow text-xs mb-3">Gallery</div>
                <div class="flex gap-3 flex-wrap">
                  @for (src of project.gallery; track src; let i = $index) {
                    <button class="thumb" [class.is-active]="i === active()" (click)="active.set(i)">
                      <img [src]="src" [alt]="project.title + ' screenshot ' + (i + 1)" loading="lazy" />
                    </button>
                  }
                </div>
              </div>
            }

            <div class="mt-8 pt-6 border-t border-[rgba(124,92,255,0.14)]">
              <a [href]="project.repo" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors">
                <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
                </svg>
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: contents; }

    .overlay {
      position: fixed; inset: 0; z-index: 100;
      display: flex; align-items: center; justify-content: center;
      padding: 1.5rem;
      background: rgba(5,6,15,0.6);
      backdrop-filter: blur(6px);
      animation: fadeIn 0.3s ease-out both;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .bg-flow {
      position: absolute; inset: 0;
      overflow: hidden;
      pointer-events: none;
    }
    .bg-layer {
      position: absolute; inset: -5%;
      background-size: cover;
      background-position: center;
      opacity: 0;
      /* Slow, randomised drift so the background never feels like a slideshow. */
      animation: drift 22s ease-in-out infinite, crossfade 9s ease-in-out infinite;
      filter: blur(2px) saturate(0.9);
    }
    .bg-layer.is-active { animation-play-state: running; }
    @keyframes drift {
      0%   { transform: scale(1.08) translate(0, 0); }
      25%  { transform: scale(1.14) translate(-2%, 1.5%); }
      50%  { transform: scale(1.1) translate(1.5%, -1%); }
      75%  { transform: scale(1.16) translate(-1%, -1.5%); }
      100% { transform: scale(1.08) translate(0, 0); }
    }
    @keyframes crossfade {
      0%, 100% { opacity: 0.22; }
      50%      { opacity: 0.4; }
    }
    .bg-scrim {
      position: absolute; inset: 0;
    }

    .panel {
      position: relative;
      z-index: 1;
      width: min(760px, 100%);
      max-height: min(84vh, 880px);
      border-radius: 1.5rem;
      animation: panelIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
      overflow: hidden;
    }
    @keyframes panelIn {
      from { opacity: 0; transform: translateY(16px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .panel-scroll {
      max-height: min(84vh, 880px);
      overflow-y: auto;
      padding: 2.25rem 2rem 2rem;
    }
    @media (min-width: 640px) {
      .panel-scroll { padding: 2.75rem 2.5rem 2.5rem; }
    }

    .close-btn {
      position: absolute; top: 1rem; right: 1rem; z-index: 2;
      width: 36px; height: 36px;
      display: grid; place-items: center;
      border-radius: 999px;
      background: rgba(5,6,15,0.6);
      border: 1px solid rgba(255,255,255,0.12);
      color: var(--color-text);
      transition: background 0.25s, transform 0.25s;
    }
    .close-btn:hover { background: rgba(124,92,255,0.25); transform: rotate(90deg); }

    .thumb {
      width: 84px; height: 56px;
      border-radius: 0.6rem;
      overflow: hidden;
      border: 2px solid transparent;
      opacity: 0.55;
      transition: opacity 0.25s, border-color 0.25s, transform 0.25s;
    }
    .thumb img { width: 100%; height: 100%; object-fit: cover; }
    .thumb:hover { opacity: 0.85; transform: translateY(-2px); }
    .thumb.is-active { opacity: 1; border-color: rgba(124,92,255,0.7); }
  `],
})
export class ProjectDetailComponent implements OnChanges, OnDestroy {
  @Input() project: ProjectItem | null = null;
  @Output() close = new EventEmitter<void>();

  /** Which gallery image is the current background/thumbnail focus. */
  active = signal(0);
  private cycleTimer?: ReturnType<typeof setInterval>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.active.set(0);
      this.restartCycle();
      document.body.style.overflow = this.project ? 'hidden' : '';
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.cycleTimer);
    document.body.style.overflow = '';
  }

  private restartCycle(): void {
    clearInterval(this.cycleTimer);
    if (!this.project || this.project.gallery.length < 2) return;
    // Randomised hold time per image so the flow doesn't feel metronomic.
    const tick = () => {
      const n = this.project!.gallery.length;
      this.active.update((i) => (i + 1) % n);
      clearInterval(this.cycleTimer);
      this.cycleTimer = setInterval(tick, 4500 + Math.random() * 3000);
    };
    this.cycleTimer = setInterval(tick, 4500 + Math.random() * 3000);
  }

  scrimGradient(): string {
    const accent = this.project?.accent ?? '#7c5cff';
    return `linear-gradient(180deg, rgba(5,6,15,0.55) 0%, rgba(5,6,15,0.92) 70%), radial-gradient(circle at 50% 20%, ${accent}22, transparent 60%)`;
  }

  onBackdrop(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.project) this.close.emit();
  }
}
