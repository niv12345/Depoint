import { Component } from '@angular/core';

import { Platform, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  
    private router: Router,
    private alertController:AlertController,
    private menu:MenuController,
    private authService:AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.authenticationState.subscribe(state =>{
        if(state){
          this.router.navigate(['home']);
        }else{
          this.router.navigate(['login']);
        }
      })
//     

// this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

// this.oneSignal.handleNotificationReceived().subscribe(() => {
//  // do something when notification is received
// });

// this.oneSignal.handleNotificationOpened().subscribe(() => {
//   // do something when a notification is opened
// });

// this.oneSignal.endInit();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    switch(page){
     case 1:
     this.menu.close();
           this.router.navigateByUrl('home');
            break;
     case 2:
           
            break;
     case 3:
            this.presentAlertConfirm();
            break;
  }
}
async presentAlertConfirm() {
  const alert = await this.alertController.create({
    header: 'Logout',
    message: 'Are you sure?',
    cssClass:'txt',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'txt',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'OK',
        cssClass:'txt',
        handler: () => {
          console.log('Confirm Okay');
          this.menu.close();
          this.menu.enable(false);
          this.authService.logout();
          localStorage.clear();
          localStorage.removeItem('USER');
          localStorage.removeItem('AUTH_KEY');
          localStorage.removeItem('BASE_URL');
          localStorage.removeItem('LOGO');
          this.router.navigateByUrl('login');
        }
      }
    ]
  });

  await alert.present();


}
}
