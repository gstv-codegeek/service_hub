import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {authGuard} from '../../auth/services/guard/auth.guard';
import {CreateCategoryComponent} from './components/categories/create-category/create-category.component';
import {AllCategoriesComponent} from './components/categories/all-categories/all-categories.component';
import {BookServiceComponent} from './components/bookings/book-service/book-service.component';
import {AllServicesComponent} from './components/solutions/all-services/all-services.component';
import {AllBookingsComponent} from './components/bookings/all-bookings/all-bookings.component';
import {ProvidersComponent} from './components/users/providers/all-providers/providers.component';
import {CustomersComponent} from './components/users/customers/all-customers/customers.component';
import {UpdateCustomerComponent} from './components/users/customers/update-customer/update-customer.component';
import {UpdateProviderComponent} from './components/users/providers/update-provider/update-provider.component';
import {CreateServiceComponent} from './components/solutions/create-service/create-service.component';
import {CreateProviderComponent} from './components/users/providers/create-provider/create-provider.component';
import {CreateCustomerComponent} from './components/users/customers/create-customer/create-customer.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component:  AdminDashboardComponent, canActivate: [authGuard]},
  { path: 'categories', component:  AllCategoriesComponent, canActivate: [authGuard]},
  { path: 'category/create', component:  CreateCategoryComponent, canActivate: [authGuard]},
  { path: 'providers', component:  ProvidersComponent, canActivate: [authGuard]},
  { path: 'provider/update', component:  UpdateProviderComponent, canActivate: [authGuard]},
  { path: 'provider/create', component:  CreateProviderComponent, canActivate: [authGuard]},
  { path: 'clients', component:  CustomersComponent, canActivate: [authGuard]},
  { path: 'client/update', component:  UpdateCustomerComponent, canActivate: [authGuard]},
  { path: 'client/create', component:  CreateCustomerComponent, canActivate: [authGuard]},
  { path: 'category/create', component:  CreateCategoryComponent, canActivate: [authGuard]},
  { path: 'services', component:  AllServicesComponent, canActivate: [authGuard]},
  { path: 'service/create', component:  CreateServiceComponent, canActivate: [authGuard]},
  { path: 'bookings', component:  AllBookingsComponent, canActivate: [authGuard]},
  { path: 'service/book', component:  BookServiceComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
