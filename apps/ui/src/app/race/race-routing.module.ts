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
];

export const RaceRoutingModule = RouterModule.forChild(routes);
