import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzHeaderComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NgZorroImportsModule} from '../../NgZorroImportsModule';
import {StorageService} from '../../auth/services/storage/storage.service';
import {NgIf} from '@angular/common';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-authorized-user-layout',
  imports: [
    NgZorroImportsModule,
    NzButtonComponent,
    NzHeaderComponent,
    NzLayoutComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    RouterLink,
    RouterLinkActive,
    NgIf,
    RouterOutlet,
  ],
  templateUrl: './authorized-user-layout.component.html',
  styleUrl: './authorized-user-layout.component.scss'
})
export class AuthorizedUserLayoutComponent {
  isCollapsed = false;
  theme:any = 'dark';
  openMap: { [name: string]: boolean } = {
    sub1: false,
    sub2: false,
    sub3: false,
    sub4: false
  };
  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  };

  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  isProviderLoggedIn: boolean = StorageService.isProviderLoggedIn();
  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn();

  constructor(private message: NzMessageService, private router: Router) {
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl("/home").then(r => {this.message.success("You have successfully logged out");});
  }
}
