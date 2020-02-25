import { FirebaseModule } from './../firebase/firebase.module';
import { PlayerModule } from './../player/player.module';
import { MaterialModule } from './../material.module';
import { LandingComponent, LoginComponent } from './component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './component/loading/loading.component';

const exportComponents = [
  LoginComponent,
  LandingComponent,
  LoadingComponent,
]


@NgModule({
  declarations: [
    exportComponents,
    LoadingComponent
  ],
  exports: [
    exportComponents,
    MaterialModule,
    FirebaseModule,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FirebaseModule,
    PlayerModule,
  ]
})
export class SharedModule { }
