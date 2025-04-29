import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <div
      class="container-fluid text-center text-white font-weight-bold"
      style="background-color: var(--p-emerald-700)"
    >
      this is the footer
    </div>
  `,
})
export class FooterComponent {}
