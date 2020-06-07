import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FirebaseModule, RaceApiModule, SeasonApiModule } from '@f2020/api';
import { DriverModule } from '@f2020/driver';
import { PlayerModule } from '@f2020/player';
import { SharedModule } from '@f2020/shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as firebase from "firebase/app";
import { DateTime } from 'luxon';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { metaReducers, reducers } from './reducers';

firebase.initializeApp(environment.firebaseConfig);

const materialModule = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSnackBarModule,
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule,
    GoogleMapsModule,
    materialModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    PlayerModule,
    DriverModule,
    SeasonApiModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
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
    RaceApiModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    FirebaseModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'da',
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    DateTime.local().setLocale('da');
    registerLocaleData(localeDa);
  }
}


