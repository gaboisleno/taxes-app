import { CategoriesComponent } from './categories/categories.component';
import { NewCategoryComponent } from './categories/new.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPaymentComponent } from './payments/new.component';
import { PaymentsComponent } from './payments/payments.component';

export default [
  {
    path: 'payments',
    children: [
      { path: '', component: PaymentsComponent },
      { path: 'new', component: NewPaymentComponent },
      { path: 'edit/:id', component: NewPaymentComponent },
    ],
  },
  {
    path: 'categories',
    children: [
      { path: '', component: CategoriesComponent },
      { path: 'new', component: NewCategoryComponent },
      { path: 'edit/:id', component: NewCategoryComponent },
    ],
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '' },
];
