import { LandingComponent, LoginComponent } from './component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './component/loading/loading.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FirebaseModule } from '../firebase';
import { PlayerModule } from '../player/player.module';
import { MaterialModule } from '../material.module';

const exportComponents = [
  LoginComponent,
  LandingComponent,
  LoadingComponent,
];

@NgModule({
  declarations: [
    exportComponents,
    LoadingComponent,
  ],
  exports: [
    exportComponents,
    MaterialModule,
    FirebaseModule,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FirebaseModule,
    PlayerModule,
  ],
})
export class SharedModule {
}
