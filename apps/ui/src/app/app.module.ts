import { FirebaseModule } from './firebase/firebase.module';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    FlexLayoutModule,
    FirebaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MaterialModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
