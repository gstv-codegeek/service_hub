import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerDashboardComponent} from '../customer/components/customer-dashboard/customer-dashboard.component';
import {ProviderDashboardComponent} from './components/provider-dashboard/provider-dashboard.component';
import {authGuard} from '../../auth/services/guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: ProviderDashboardComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
