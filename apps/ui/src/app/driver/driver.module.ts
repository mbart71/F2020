import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDriver from './+state/driver.reducer';
import { DriverEffects } from './+state/driver.effects';
import { DriverFacade } from './+state/driver.facade';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { DriverNamePipe } from './pipe/driver-name.pipe';

@NgModule({
  declarations: [DriverNamePipe],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromDriver.DRIVER_FEATURE_KEY, fromDriver.reducer),
    EffectsModule.forFeature([DriverEffects]),
    HttpClientModule,
    AngularFireModule,
  ],
  providers: [DriverFacade]
})
export class DriverModule {}
