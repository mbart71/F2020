import { DriverPipe } from './pipe/driver.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDrivers from './+state/drivers.reducer';
import { DriversEffects } from './+state/drivers.effects';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { DriverNamePipe } from './pipe/driver-name.pipe';

const pipes = [
  DriverPipe,
  DriverNamePipe,
];

@NgModule({
  declarations: [pipes],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromDrivers.DRIVERS_FEATURE_KEY, fromDrivers.reducer),
    EffectsModule.forFeature([DriversEffects]),
    HttpClientModule,
    AngularFireModule,
  ],
  exports: [
    pipes,
  ],
})
export class DriverModule {
}
