import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SeasonApiModule } from '@f2020/api';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { WbcStandingsComponent } from './component/wbc-standings/wbc-standings.component';
import { WbcPlayerComponent } from './component/wbc-player/wbc-player.component';

const MaterialModulde = [
  MatListModule,
  MatButtonModule,
  MatToolbarModule,
];

@NgModule({
  imports: [
    CommonModule,
    SeasonApiModule,
    MaterialModulde,
    RouterModule.forChild([
      {
        path: '',
        component: WbcStandingsComponent
      },
      {
        path: 'player/:uid',
        component: WbcPlayerComponent
      }
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ])
  ],
  declarations: [WbcStandingsComponent, WbcPlayerComponent]
})
export class WbcModule {}
