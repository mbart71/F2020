import { RouterModule, Routes } from '@angular/router';
import { LandingComponent, LoginComponent } from './shared';

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
    path: 'standings',
    loadChildren: () => import('../app/standing/standing.module').then(m => m.StandingModule),
  },
  {
    path: 'account',
    loadChildren: () => import('../app/accounts/accounts.module').then(m => m.AccountsModule),
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
