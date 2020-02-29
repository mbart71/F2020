import { LandingComponent, LoginComponent } from './shared';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'standing',
    loadChildren: () => import('../app/standing/standing.module').then(m => m.StandingModule),
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
