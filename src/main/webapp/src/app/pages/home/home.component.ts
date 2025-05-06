import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="container">
      <div class="d-flex flex-column gap-3">
        <p-button label="Home" />
        <p-button label="Logout" (click)="logout()" />
      </div>
    </div>
  `,
})
export class HomeComponent {
  constructor(private auth: AuthService, private router: Router) {}

  public logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
