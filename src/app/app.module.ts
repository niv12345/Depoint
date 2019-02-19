
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './service/auth-guard.service';
import { IonicStorageModule } from '@ionic/storage';
import { MaterialModule } from './material/material.module';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx'
import { FabmenuListPage } from './fabmenu/fabmenu-list/fabmenu-list.page';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@NgModule({
  declarations: [AppComponent,FabmenuListPage],
  entryComponents: [FabmenuListPage],

  imports: [
            BrowserModule, 
            HttpClientModule,
           
            MaterialModule,
            IonicModule.forRoot(), AppRoutingModule,
            IonicStorageModule.forRoot(),
            ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
           
          ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidFingerprintAuth,
    OneSignal,
    FingerprintAIO,
    Base64,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
100929608493