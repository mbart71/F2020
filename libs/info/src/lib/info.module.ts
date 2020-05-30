import { GithubService } from './service/github.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@f2020/shared';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RulesComponent } from './component/rules/rules.component';
import { AboutComponent } from './component/about/about.component';
import { MissingRoleComponent } from './component/missing-role/missing-role.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'rules',
        component: RulesComponent,
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'roles',
        component: MissingRoleComponent
      }
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ])
  ],
  declarations: [
    RulesComponent, 
    AboutComponent, 
    MissingRoleComponent
  ],
  providers: [
    GithubService
  ]
})
export class InfoModule {}
