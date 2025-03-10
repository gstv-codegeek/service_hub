import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {authGuard} from '../../auth/services/guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component:  AdminDashboardComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
