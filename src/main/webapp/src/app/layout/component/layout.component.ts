import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from './footer.component';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FooterComponent,
    MenuComponent,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    <p-toast></p-toast>
    <body class="d-flex flex-column min-vh-100">
      <div class="container-fluid m-0 p-0">
        <app-menu />
      </div>
      <div class="container-fluid flex-grow-1 my-3">
        <router-outlet></router-outlet>
      </div>
      <div class="container-fluid m-0 p-0 text-center">
        <app-footer />
      </div>
    </body>
  `,
})
export class LayoutComponent {}
