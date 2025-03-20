import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from '../admin/components/admin-dashboard/admin-dashboard.component';
import {CustomerDashboardComponent} from './components/customer-dashboard/customer-dashboard.component';
import {authGuard} from '../../auth/services/guard/auth.guard';
import {SolutionsComponent} from './components/solutions/solutions.component';
import {BookingsComponent} from './components/bookings/bookings.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: CustomerDashboardComponent, canActivate: [authGuard]},
  { path: 'services', component: SolutionsComponent, canActivate: [authGuard]},
  { path: 'bookings', component: BookingsComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
