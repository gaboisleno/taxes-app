import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="flex justify-center">
      <p-button label="Home" />
    </div>
  `,
})
export class HomeComponent {}
