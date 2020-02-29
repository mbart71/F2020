import { RouterModule, Routes } from '@angular/router';
import { StandingListComponent } from './component/standing-list/standing-list.component';
import { StandingDriverComponent } from './component/standing-driver/standing-driver.component';

const routes: Routes = [
  {
    path: '',
    component: StandingListComponent,
  },
  {
    path: ':code',
    component: StandingDriverComponent,
  },
];

export const StandingRoutingModule = RouterModule.forChild(routes);
