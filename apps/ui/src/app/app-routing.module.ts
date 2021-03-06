import { LandingModule } from '@f2020/landing';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@f2020/shared';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    loadChildren: () => import('@f2020/landing').then(m => m.LandingModule),
  },
  {
    path: 'race',
    loadChildren: () => import('@f2020/race').then(m => m.RaceModule),
  },
  {
    path: 'wbc',
    loadChildren: () => import('@f2020/wbc').then(m => m.WbcModule),
  },
  {
    path: 'standings',
    loadChildren: () => import('@f2020/standing').then(m => m.StandingModule),
  },
  {
    path: 'players',
    loadChildren: () => import('@f2020/players').then(m => m.PlayersModule),
  },
  {
    path: 'accounts',
    loadChildren: () => import('@f2020/bank').then(m => m.BankModule),
  },
  {
    path: 'info',
    loadChildren: () => import('@f2020/info').then(m => m.InfoModule),
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
