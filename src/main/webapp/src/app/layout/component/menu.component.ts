import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, Menubar],
  template: ` <p-menubar [model]="items"></p-menubar> `,
})
export class MenuComponent implements OnInit {
  items: any[] | undefined;
  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-list',
        routerLink: '/pages/dashboard',
      },
      {
        label: 'Categories',
        icon: 'pi pi-list',
        routerLink: '/pages/categories',
      },
      {
        label: 'Payments',
        icon: 'pi pi-wallet',
        routerLink: '/pages/payments',
      },
    ];
  }
}
