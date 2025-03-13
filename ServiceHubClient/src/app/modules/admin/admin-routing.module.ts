import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {authGuard} from '../../auth/services/guard/auth.guard';
import {CreateCategoryComponent} from './components/categories/create-category/create-category.component';
import {AllCategoriesComponent} from './components/categories/all-categories/all-categories.component';
import {BookServiceComponent} from './components/bookings/book-service/book-service.component';
import {AllServicesComponent} from './components/solutions/all-services/all-services.component';
import {AllBookingsComponent} from './components/bookings/all-bookings/all-bookings.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component:  AdminDashboardComponent, canActivate: [authGuard]},
  { path: 'categories', component:  AllCategoriesComponent, canActivate: [authGuard]},
  { path: 'category/create', component:  CreateCategoryComponent, canActivate: [authGuard]},
  { path: 'services', component:  AllServicesComponent, canActivate: [authGuard]},
  { path: 'service/book', component:  BookServiceComponent, canActivate: [authGuard]},
  { path: 'bookings', component:  AllBookingsComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
