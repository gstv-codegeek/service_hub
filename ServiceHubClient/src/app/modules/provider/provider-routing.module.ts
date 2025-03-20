import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerDashboardComponent} from '../customer/components/customer-dashboard/customer-dashboard.component';
import {ProviderDashboardComponent} from './components/provider-dashboard/provider-dashboard.component';
import {authGuard} from '../../auth/services/guard/auth.guard';
import {SolutionsComponent} from './components/solutions/all-solutions/solutions.component';
import {CreateServiceComponent} from './components/solutions/create-service/create-service.component';
import {BookingsComponent} from './components/bookings/bookings.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: ProviderDashboardComponent, canActivate: [authGuard]},
  { path: 'services', component: SolutionsComponent, canActivate: [authGuard]},
  { path: 'service/create', component: CreateServiceComponent, canActivate: [authGuard]},
  { path: 'bookings', component: BookingsComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
