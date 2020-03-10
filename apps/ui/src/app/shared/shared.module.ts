import { LandingComponent, LoginComponent } from './component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './component/loading/loading.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlayerModule } from '../player/player.module';
import { MaterialModule } from '../material.module';
import { SidenavButtonComponent } from './component/sidenav-button/sidenav-button.component';
import { PageComponent } from './component/page/page.component';
import { CardPageComponent } from './component/card-page/card-page.component';

const exportComponents = [
  LoginComponent,
  LandingComponent,
  LoadingComponent,
];

@NgModule({
  declarations: [
    exportComponents,
    LoadingComponent,
    SidenavButtonComponent,
    PageComponent,
    CardPageComponent,
  ],
  exports: [
    exportComponents,
    MaterialModule,
    SidenavButtonComponent,
    CardPageComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    PlayerModule,
  ],
})
export class SharedModule {
}
