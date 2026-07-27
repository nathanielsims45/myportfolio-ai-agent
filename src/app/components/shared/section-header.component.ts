import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  template: `
    <div class="reveal mb-12 text-center">
      <div class="eyebrow">{{ eyebrow() }}</div>
      <h2 class="mt-3 text-3xl sm:text-4xl font-bold tracking-tight gradient-text">{{ title() }}</h2>
      @if (subtitle()) {
        <p class="mt-3 text-text-muted max-w-2xl mx-auto">{{ subtitle() }}</p>
      }
    </div>
  `,
})
export class SectionHeaderComponent {
  eyebrow = input.required<string>();
  title = input.required<string>();
  subtitle = input<string>('');
}
