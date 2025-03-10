import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/components/login/login.component";
import {SignupComponent} from "./auth/components/signup/signup.component";
import {FrontendComponent} from "./frontend/frontend.component";
import {HomeLayoutComponent} from "./layouts/home-layout/home-layout.component";
import {AuthorizedUserLayoutComponent} from "./layouts/authorized-user-layout/authorized-user-layout.component";
import {authGuard} from './auth/services/guard/auth.guard';

export const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'home'},
  {path: 'home', component: HomeLayoutComponent, children: [{path: '', component: FrontendComponent}]},

  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},

  {
    path: 'admin',
    component: AuthorizedUserLayoutComponent,
    loadChildren: () => import("./modules/admin/admin.module")
      .then(m => m.AdminModule),
    canActivate: [authGuard]
  },
  {
    path: 'provider',
    component: AuthorizedUserLayoutComponent,
    loadChildren: () => import("./modules/provider/provider.module")
      .then(m => m.ProviderModule),
    canActivate: [authGuard]
  },
  {
    path: 'customer',
    component: AuthorizedUserLayoutComponent,
    loadChildren: () => import("./modules/customer/customer.module")
      .then(m => m.CustomerModule),
    canActivate: [authGuard]
  },
];
