import {NgModule} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzCarouselModule} from 'ng-zorro-antd/carousel';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';

@NgModule({
  exports: [
    NzButtonModule,
    NzCardModule,
    NzCarouselModule,
    NzCollapseModule,
    NzDividerModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzSpinModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
  ]
})
export class NgZorroImportsModule {

}
