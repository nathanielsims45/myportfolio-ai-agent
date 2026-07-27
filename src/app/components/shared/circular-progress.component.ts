import { Component, input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  template: `
    <div class="relative w-full aspect-square max-w-[140px] mx-auto">
      <svg viewBox="0 0 120 120" class="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(124,92,255,0.12)" stroke-width="8" />
        <circle #bar cx="60" cy="60" r="52" fill="none" stroke="url(#grad)" stroke-width="8"
          stroke-linecap="round" stroke-dasharray="326.7" stroke-dashoffset="326.7"
          style="transition:stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)" />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7c5cff" />
            <stop offset="100%" stop-color="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
      <div class="absolute inset-0 grid place-items-center text-center">
        <div>
          <div class="text-2xl font-bold gradient-text">{{ value() }}%</div>
          <div class="text-[10px] text-text-muted font-mono mt-0.5">{{ name() }}</div>
        </div>
      </div>
    </div>
  `,
})
export class CircularProgressComponent implements AfterViewInit {
  value = input.required<number>();
  name = input.required<string>();
  @ViewChild('bar') bar?: ElementRef<SVGCircleElement>;

  ngAfterViewInit(): void {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const len = 2 * Math.PI * 52;
          const offset = len - (len * this.value()) / 100;
          if (this.bar) this.bar.nativeElement.style.strokeDashoffset = String(offset);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (this.bar) obs.observe(this.bar.nativeElement);
  }
}
