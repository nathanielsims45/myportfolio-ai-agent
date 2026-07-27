import { Component, signal, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NavItem { label: string; href: string; }

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
    <header
      class="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      [class.glass]="scrolled()"
      [class.border-b]="scrolled()"
      [style.border-color]="scrolled() ? 'rgba(124,92,255,0.18)' : 'transparent'"
    >
      <nav class="container-x flex items-center justify-between px-6 h-16">
        <a routerLink="/" class="flex items-center gap-2 font-semibold tracking-tight">
          <span class="grid place-items-center w-8 h-8 rounded-lg"
            style="background:linear-gradient(135deg,#7c5cff,#38bdf8);box-shadow:var(--shadow-glow)">NS</span>
          <span class="gradient-text">Nathaniel Sims</span>
        </a>

        <ul class="hidden lg:flex items-center gap-1 text-sm text-text-muted">
          @for (item of items; track item.href) {
            <li>
              <a
                [href]="item.href"
                class="nav-link relative px-3 py-2 rounded-md transition-colors hover:text-text"
              >{{ item.label }}</a>
            </li>
          }
        </ul>

        <div class="flex items-center gap-3">
          <a href="#contact"
            class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white"
            style="background:linear-gradient(135deg,#7c5cff,#38bdf8);box-shadow:var(--shadow-glow)">
            Hire me
          </a>
          <button class="lg:hidden p-2" (click)="menuOpen.set(!menuOpen())" aria-label="Menu">
            <span class="block w-5 h-0.5 bg-text mb-1"></span>
            <span class="block w-5 h-0.5 bg-text mb-1"></span>
            <span class="block w-5 h-0.5 bg-text"></span>
          </button>
        </div>
      </nav>

      @if (menuOpen()) {
        <div class="lg:hidden glass border-t border-[rgba(124,92,255,0.18)] px-6 py-4">
          <ul class="flex flex-col gap-1 text-text-muted">
            @for (item of items; track item.href) {
              <li>
                <a [href]="item.href" (click)="menuOpen.set(false)" class="block py-2 hover:text-text">{{ item.label }}</a>
              </li>
            }
          </ul>
        </div>
      }
    </header>
  `,
  styles: [`
    .nav-link::after {
      content: "";
      position: absolute;
      left: 12px; right: 12px; bottom: 4px;
      height: 1.5px;
      background: linear-gradient(90deg, #7c5cff, #38bdf8);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
    }
    .nav-link:hover::after { transform: scaleX(1); }
  `],
})
export class NavbarComponent {
  scrolled = signal(false);
  menuOpen = signal(false);
  items: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Charts', href: '#charts' },
    { label: 'AI', href: '#ai' },
    { label: 'Contact', href: '#contact' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 24);
  }
}
