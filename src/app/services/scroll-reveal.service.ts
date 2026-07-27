import { Injectable, signal, ElementRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollRevealService {
  private observer?: IntersectionObserver;
  readonly ready = signal(false);

  observe(root: ElementRef<HTMLElement> | HTMLElement) {
    if (typeof IntersectionObserver === 'undefined') return;
    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    const rootEl = root instanceof ElementRef ? root.nativeElement : root;
    const targets = rootEl.querySelectorAll('.reveal');
    targets.forEach((t) => this.observer?.observe(t));
    this.ready.set(true);
  }

  refresh() {
    queueMicrotask(() => {
      const targets = document.querySelectorAll('.reveal:not(.in-view)');
      targets.forEach((t) => this.observer?.observe(t));
    });
  }
}
