import { Component, signal } from '@angular/core';
import { SectionHeaderComponent } from '../shared/section-header.component';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  imports: [SectionHeaderComponent],
  template: `
    <section id="contact" class="section-pad relative">
      <div class="container-x">
        <app-section-header eyebrow="Contact" title="Let's build something"
          subtitle="Available for AI agent, Azure, and full stack projects." />

        <div class="grid lg:grid-cols-2 gap-8">
          <form class="reveal glass rounded-3xl p-8 space-y-4" (submit)="submit($event)">
            <div class="grid sm:grid-cols-2 gap-4">
              <label class="block">
                <span class="text-sm text-text-muted">Name</span>
                <input name="name" required class="form-input" placeholder="Your name" />
              </label>
              <label class="block">
                <span class="text-sm text-text-muted">Email</span>
                <input name="email" type="email" required class="form-input" placeholder="you@company.com" />
              </label>
            </div>
            <label class="block">
              <span class="text-sm text-text-muted">Project</span>
              <input name="project" class="form-input" placeholder="Enterprise Angular platform" />
            </label>
            <label class="block">
              <span class="text-sm text-text-muted">Message</span>
              <textarea name="message" rows="4" required class="form-input" placeholder="Tell me about your project"></textarea>
            </label>
            <button type="submit" class="btn-primary w-full justify-center">Send message</button>
            @if (sent()) {
              <p class="text-success text-sm text-center">Thanks — I'll be in touch within 24 hours.</p>
            }
          </form>

          <div class="reveal space-y-4">
            <a [href]="profile.github" target="_blank" rel="noopener noreferrer"
              class="gh-card glass glass-hover gradient-border rounded-2xl p-6 flex items-center gap-4 group">
              <span class="gh-mark grid place-items-center w-14 h-14 rounded-2xl shrink-0 text-white">
                <svg viewBox="0 0 16 16" width="26" height="26" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
                </svg>
              </span>
              <div class="min-w-0">
                <div class="eyebrow text-[0.65rem]">GitHub</div>
                <div class="mt-0.5 font-semibold text-text truncate">{{ '@' + profile.githubHandle }}</div>
                <div class="text-xs text-text-muted">Open-source work & enterprise samples</div>
              </div>
              <span class="ml-auto text-accent text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <div class="grid sm:grid-cols-2 gap-4">
              <div class="glass glass-hover rounded-2xl p-5">
                <div class="eyebrow text-[0.65rem]">Rate</div>
                <div class="mt-1 text-2xl font-bold gradient-text">{{ profile.rate }}</div>
                <div class="mt-1 text-xs text-text-muted">{{ profile.availability }}</div>
              </div>
              <div class="glass glass-hover rounded-2xl p-5">
                <div class="eyebrow text-[0.65rem]">Response</div>
                <div class="mt-1 text-2xl font-bold gradient-text">&lt; 24h</div>
                <div class="mt-1 text-xs text-text-muted">Weekdays, same business day</div>
              </div>
            </div>

            <div class="glass gradient-border rounded-2xl overflow-hidden relative h-64">
              <img src="https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Desert landscape near Albuquerque, New Mexico" loading="lazy" decoding="async"
                class="w-full h-full object-cover" />
              <div class="absolute inset-0"
                style="background:linear-gradient(180deg, rgba(5,6,15,0.25) 0%, rgba(5,6,15,0.92) 100%)"></div>
              <div class="absolute inset-x-5 bottom-5">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                  <span class="eyebrow text-[0.65rem]">Based in</span>
                </div>
                <div class="mt-1 font-semibold text-text">{{ profile.location }}</div>
                <div class="text-xs text-text-muted font-mono">{{ profile.timezone }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .form-input {
      width: 100%; margin-top: 0.4rem; padding: 0.8rem 1rem;
      background: rgba(5,6,15,0.55);
      border: 1px solid var(--color-border);
      border-radius: 0.85rem; color: var(--color-text);
      font-family: inherit; font-size: 0.95rem;
      transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
    }
    .form-input::placeholder { color: rgba(154,160,195,0.55); }
    .form-input:hover { border-color: rgba(124,92,255,0.35); }
    .form-input:focus {
      outline: none;
      background: rgba(5,6,15,0.75);
      border-color: rgba(124,92,255,0.6);
      box-shadow: 0 0 0 3px rgba(124,92,255,0.15);
    }
    .gh-card { text-decoration: none; }
    .gh-mark {
      background: linear-gradient(135deg, #7c5cff, #38bdf8);
      box-shadow: var(--shadow-glow);
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .gh-card:hover .gh-mark { transform: rotate(-6deg) scale(1.06); }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.7rem 1.4rem; border-radius: 999px;
      font-weight: 600; color: #fff;
      background: linear-gradient(135deg, #7c5cff, #38bdf8);
      box-shadow: var(--shadow-glow);
      transition: transform 0.3s;
    }
    .btn-primary:hover { transform: translateY(-2px); }
  `],
})
export class ContactComponent {
  readonly profile = PROFILE;
  sent = signal(false);
  submit(e: Event) {
    e.preventDefault();
    this.sent.set(true);
  }
}
