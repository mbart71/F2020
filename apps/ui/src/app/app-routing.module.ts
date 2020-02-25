import { LandingComponent, LoginComponent } from './shared';
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LandingComponent
  }
]

export const   AppRoutingModule = RouterModule.forRoot(routes);
