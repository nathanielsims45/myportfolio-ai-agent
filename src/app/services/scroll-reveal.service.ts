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
      // A single 0.12 threshold never fires for elements taller than the
      // viewport, which left tall panels stuck at opacity 0. Trigger as soon
      // as any part scrolls in, and keep a fractional threshold for short ones.
      { threshold: [0, 0.12], rootMargin: '0px 0px -5% 0px' }
    );
    const rootEl = root instanceof ElementRef ? root.nativeElement : root;
    const targets = rootEl.querySelectorAll('.reveal');
    targets.forEach((t) => {
      // Anything already spanning the viewport may never produce an
      // intersection change, so reveal it up front.
      const r = t.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        t.classList.add('in-view');
        return;
      }
      this.observer?.observe(t);
    });
    this.ready.set(true);
  }

  refresh() {
    queueMicrotask(() => {
      const targets = document.querySelectorAll('.reveal:not(.in-view)');
      targets.forEach((t) => this.observer?.observe(t));
    });
  }
}
