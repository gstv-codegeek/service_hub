import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NgZorroImportsModule} from '../../NgZorroImportsModule';
import {StorageService} from '../../auth/services/storage/storage.service';
import {NgIf} from '@angular/common';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-authorized-user-layout',
  imports: [
    RouterOutlet,
    NgZorroImportsModule,
    NzButtonComponent,
    NzContentComponent,
    NzFooterComponent,
    NzHeaderComponent,
    NzLayoutComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    RouterLink,
    NzFlexDirective,
    RouterLinkActive,
    NgIf,
  ],
  templateUrl: './authorized-user-layout.component.html',
  styleUrl: './authorized-user-layout.component.scss'
})
export class AuthorizedUserLayoutComponent {
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  isProviderLoggedIn: boolean = StorageService.isProviderLoggedIn();
  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn();

  constructor(private message: NzMessageService, private router: Router) {
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl("/home");
  }
}
