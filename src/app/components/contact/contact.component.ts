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
          subtitle="Available for enterprise Angular, Azure, and AI projects." />

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
            <div class="glass rounded-2xl p-6">
              <h3 class="font-semibold text-text mb-3">Direct</h3>
              <ul class="space-y-2 text-sm text-text-muted">
                <li>Email: {{ profile.email }}</li>
                <li>LinkedIn: {{ profile.linkedin }}</li>
                <li>GitHub: {{ profile.github }}</li>
                <li>Rate: {{ profile.rate }} · {{ profile.availability }}</li>
              </ul>
            </div>
            <div class="glass rounded-2xl p-6 h-64 grid place-items-center text-text-muted text-sm font-mono">
              map placeholder
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .form-input {
      width: 100%; margin-top: 0.35rem; padding: 0.7rem 0.9rem;
      background: rgba(5,6,15,0.5);
      border: 1px solid var(--color-border);
      border-radius: 0.7rem; color: var(--color-text);
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .form-input:focus {
      outline: none;
      border-color: rgba(124,92,255,0.6);
      box-shadow: 0 0 0 3px rgba(124,92,255,0.15);
    }
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
