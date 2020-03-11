import { RouterModule, Routes } from '@angular/router';
import { RacesComponent } from './component/races/races.component';

const routes: Routes = [
  {
    path: '',
    component: RacesComponent
  }
];

export const RaceRoutingModule = RouterModule.forChild(routes);
