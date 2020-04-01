import { GoogleMapsModule } from '@angular/google-maps';
import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DateTime } from 'luxon';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseModule } from './firebase';
import { MaterialModule } from './material.module';
import { PlayerModule } from './player/player.module';
import { RaceModule } from './race/race.module';
import { metaReducers, reducers } from './reducers';
import { SeasonModule } from './season/season.module';
import { SharedModule } from './shared/shared.module';
import { DriverModule } from '@f2020/driver';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MaterialModule,
    FirebaseModule.forRoot(),
    PlayerModule,
    DriverModule,
    SeasonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    SharedModule,
    RaceModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'da',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    DateTime.local().setLocale('da');
    registerLocaleData(localeDa);
  }
}


