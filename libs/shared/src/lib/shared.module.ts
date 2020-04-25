import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent, LandingComponent } from '.';
import { LoadingComponent } from './component/loading/loading.component';
import { RelativeToNowPipe } from './pipe/relative-to-now.pipe';
import { SidenavButtonComponent } from './component/sidebar/sidenav-button/sidenav-button.component';
import { PageComponent } from './component/page/page.component';
import { CardPageComponent } from './component/card-page/card-page.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PlayerModule } from '@f2020/player';

const materialModules = [
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
]

const exportComponents = [
  LoginComponent,
  LandingComponent,
  LoadingComponent,
  PageComponent,
  CardPageComponent,
  SidebarComponent,
];

const pipes = [
  RelativeToNowPipe,
]

@NgModule({
  declarations: [
    exportComponents,
    pipes,
    SidenavButtonComponent,
  ],
  exports: [
    exportComponents,
    pipes,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    PlayerModule,
    materialModules
  ],
})
export class SharedModule {
}

