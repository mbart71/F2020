import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@f2020/shared';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RulesComponent } from './component/rules/rules.component';
import { AboutComponent } from './component/about/about.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDividerModule,
    MatToolbarModule,
    MatCardModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'rules',
        component: RulesComponent,
      },
      {
        path: 'about',
        component: AboutComponent
      }
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ])
  ],
  declarations: [RulesComponent, AboutComponent]
})
export class InfoModule {}
