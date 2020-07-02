import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from "@angular/router";
import { SeasonApiModule } from '@f2020/api';
import { SharedModule } from '@f2020/shared';
import { WbcPlayerComponent } from './component/wbc-player/wbc-player.component';
import { WbcRaceComponent } from './component/wbc-race/wbc-race.component';
import { WbcStandingsComponent } from './component/wbc-standings/wbc-standings.component';

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
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: WbcStandingsComponent
      },
      {
        path: 'player/:uid',
        component: WbcPlayerComponent
      },
      {
        path: 'race/:round',
        component: WbcRaceComponent
      }
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ])
  ],
  declarations: [
    WbcStandingsComponent, 
    WbcPlayerComponent, 
    WbcRaceComponent
  ]
})
export class WbcModule {}
