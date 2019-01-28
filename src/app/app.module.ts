
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

import { FabmenuListPage } from './fabmenu/fabmenu-list/fabmenu-list.page';



@NgModule({
  declarations: [AppComponent,FabmenuListPage],
  entryComponents: [FabmenuListPage],

  imports: [
            BrowserModule, 
            HttpClientModule,
           
            MaterialModule,
            IonicModule.forRoot(), AppRoutingModule,
            IonicStorageModule.forRoot()
           
          ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
