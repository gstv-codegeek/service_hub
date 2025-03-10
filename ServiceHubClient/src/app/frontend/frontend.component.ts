import {Component, HostListener} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzCollapseComponent, NzCollapsePanelComponent} from 'ng-zorro-antd/collapse';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzCarouselComponent, NzCarouselContentDirective} from 'ng-zorro-antd/carousel';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzFormDirective} from 'ng-zorro-antd/form';
import {NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzSpaceComponent} from 'ng-zorro-antd/space';
import {NgClass} from '@angular/common';
import {NgZorroImportsModule} from '../NgZorroImportsModule';

@Component({
  selector: 'app-frontend',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgZorroImportsModule,
    NzRowDirective,
    NzColDirective,
    NzIconDirective,
    NzDividerComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzButtonComponent,
    NzCardComponent,
    NzCarouselComponent,
    NzInputGroupComponent,
    NzInputDirective,
    NzFormDirective,
    NzCarouselContentDirective,
    NzContentComponent,
    NzFooterComponent,
    NzHeaderComponent,
    NzLayoutComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzSpaceComponent,
    NgClass,

  ],
  templateUrl: './frontend.component.html',
  styleUrl: './frontend.component.scss'
})
export class FrontendComponent {
  title = 'ServiceHub - Connecting Customer to Reliable Service Providers';

  isScrolled = false;

  ngOnInit() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }


}
