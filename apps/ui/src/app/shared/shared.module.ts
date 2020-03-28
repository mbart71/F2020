import { LandingComponent, LoginComponent } from './component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './component/loading/loading.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlayerModule } from '../player/player.module';
import { MaterialModule } from '../material.module';
import { PageComponent } from './component/page/page.component';
import { CardPageComponent } from './component/card-page/card-page.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SidenavButtonComponent } from './component/sidebar/sidenav-button/sidenav-button.component';
import { RelativeToNowPipe } from './pipe/relative-to-now.pipe';

const exportComponents = [
  LoginComponent,
  LandingComponent,
  LoadingComponent,
];

const pipes = [
  RelativeToNowPipe,
]

@NgModule({
  declarations: [
    exportComponents,
    pipes,
    LoadingComponent,
    SidenavButtonComponent,
    PageComponent,
    CardPageComponent,
    SidebarComponent,
  ],
  exports: [
    exportComponents,
    pipes,
    MaterialModule,
    CardPageComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MaterialModule,
    PlayerModule,
  ],
})
export class SharedModule {
}
