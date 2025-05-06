import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login.component';
import { LayoutComponent } from './layout/component/layout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.routes'),
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];
