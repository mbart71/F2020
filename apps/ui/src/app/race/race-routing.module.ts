import { DisplayBidComponent } from './component/display-bid/display-bid.component';
import { EnterBidComponent } from './component/enter-bid/enter-bid.component';
import { RouterModule, Routes } from '@angular/router';
import { RacesComponent } from './component/races/races.component';
import { RaceComponent } from './component/race/race.component';

const routes: Routes = [
  {
    path: 'race',
    component: RacesComponent,
  },
  {
    path: 'race/:country',
    component: RaceComponent,
  },
  {
    path: 'race/:country/bid',
    component: EnterBidComponent,
  },
  {
    path: 'race/:country/bid/:uid',
    component: DisplayBidComponent,
  },
];

export const RaceRoutingModule = RouterModule.forChild(routes);
