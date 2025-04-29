import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/component/layout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.routes'),
      },
    ],
  },
];
