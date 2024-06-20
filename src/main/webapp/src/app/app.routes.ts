import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'supply',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/supply/supply.component').then(
            (c) => c.SupplyComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/supply/edit/supply-edit.component').then(
            (c) => c.SupplyEditComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./features/supply/edit/supply-edit.component').then(
            (c) => c.SupplyEditComponent
          ),
      },
    ],
  },
  {
    path: 'payment',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/payment/payment.component').then(
            (c) => c.PaymentComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/payment/edit/payment-edit.component').then(
            (c) => c.PaymentEditComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./features/payment/edit/payment-edit.component').then(
            (c) => c.PaymentEditComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
