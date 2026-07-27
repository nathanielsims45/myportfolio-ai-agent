import { Directive, ElementRef, HostListener, OnDestroy, NgZone, inject } from '@angular/core';

@Directive({
  selector: '[appTilt]',
})
export class TiltDirective implements OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);
  private raf = 0;
  private targetRX = 0;
  private targetRY = 0;
  private curRX = 0;
  private curRY = 0;
  private glowX = 50;
  private glowY = 50;

  constructor() {
    this.zone.runOutsideAngular(() => {
      this.raf = requestAnimationFrame(this.tick);
    });
  }

  @HostListener('mouseenter')
  onEnter() {
    const el = this.el.nativeElement;
    el.style.transition = 'transform 0.2s ease-out, box-shadow 0.4s';
    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';
  }

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent) {
    const el = this.el.nativeElement;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    this.targetRY = (px - 0.5) * 14;
    this.targetRX = -(py - 0.5) * 14;
    this.glowX = px * 100;
    this.glowY = py * 100;
    el.style.setProperty('--glow-x', `${this.glowX}%`);
    el.style.setProperty('--glow-y', `${this.glowY}%`);
  }

  @HostListener('mouseleave')
  onLeave() {
    this.targetRX = 0;
    this.targetRY = 0;
    const el = this.el.nativeElement;
    el.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s';
  }

  private tick = () => {
    this.curRX += (this.targetRX - this.curRX) * 0.12;
    this.curRY += (this.targetRY - this.curRY) * 0.12;
    const el = this.el.nativeElement;
    el.style.transform = `perspective(900px) rotateX(${this.curRX}deg) rotateY(${this.curRY}deg) translateZ(0)`;
    this.raf = requestAnimationFrame(this.tick);
  };

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
  }
}
