import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { environment } from 'src/environments/environment';
import { DataService } from '../service/data.service';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx'
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnChanges{
  
  userData: any;
  userProfile;
  firstName: string;
  lastName: string;
  usreRole: string;
  userBranch: string;
  profilePic;
  bdgeData = [];
  frontPage = [];  
  searchTxt='';
  toggled = false;
  baseUrl:string;
  constructor(public navCtrl: NavController,
              private apiService: ApiService,           
              private loadingCtrl: LoadingController, 
              private router:Router,
              private route:ActivatedRoute,
              private dataService:DataService,
              private plt:Platform,
              private faio:FingerprintAIO,
              private androidFingerprintAuth:AndroidFingerprintAuth
             ) {
              this.androidFingerprintAuth.isAvailable()
              .then((result)=> {
                if(result.isAvailable){
                  // it is available
                //   this.faio.show({
                //     clientId: 'Fingerprint-Demo',
                //     clientSecret: 'password', //Only necessary for Android
                //     disableBackup:true,  //Only for Android(optional)
                //     localizedFallbackTitle: 'Use Pin', //Only for iOS
                //     localizedReason: 'Please authenticate', //Only for iOS,
                  
                // })
                // .then((result: any) => console.log(result))
                // .catch((error: any) => console.log(error));
            
                  this.androidFingerprintAuth.encrypt({ clientId: 'depoint', username: 'myUsername', password: 'myPassword' })
                    .then(result => {
                       if (result.withFingerprint) {
                           console.log('Successfully encrypted credentials.');
                           console.log('Encrypted credentials: ' + result.token);
                      //  } else if (result.withBackup) {
                         
                      //    console.log('Successfully authenticated with backup password!');
                       } else console.log('Didn\'t authenticate!');
                    })
                    .catch(error => {
                       if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                         console.log('Fingerprint authentication cancelled');
                       } else console.error(error)
                    });
            
                } else {
                  // fingerprint auth isn't available
                }
              })
              .catch(error => console.error(error));
               
           
              this.showLoading();
   
  }
  ngOnChanges(){
    this.userData = JSON.parse(localStorage.getItem('USER'));
    this.baseUrl = localStorage.getItem('BASE_URL');
  }
  ionViewDidEnter() {
    this.plt.backButton.subscribeWithPriority(9999,
      ()=>{})
    this.plt.backButton.subscribe(res =>{
      console.log(res);
    });
    document.addEventListener("backbutton",function(e) {
    
    }, false);
}
  ngOnInit(){
    this.userData = JSON.parse(localStorage.getItem('USER'));
    this.baseUrl = localStorage.getItem('BASE_URL');
   // this.userData = JSON.parse(udata);
  

   this.userProfile = this.userData.data.profile; 
   this.frontPage = this.userData.data.frontpage;   
   this.profilePic = this.baseUrl + '/' +this.userProfile.avatar;
   this.firstName = this.userProfile.firstname!=null ? this.userProfile.firstname : '';
   this.lastName = this.userProfile.lastname!=null ? this.userProfile.lastname : '';
   this.usreRole = this.userProfile.select_role!=null ? this.userProfile.select_role : '';
   this.userBranch = this.userProfile.select_branch!=null ? this.userProfile.select_branch : ''; 
   this.loadingCtrl.dismiss();
  
  }
  public toggle(): void {
    this.toggled = !this.toggled;
 }
 async showLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Please wait...',  
   duration:2000,
    cssClass:'txt'
  });
  return await loading.present();
}

  imgUrl(url): string{
    return localStorage.getItem('BASE_URL') + '/' + url;
  }

  openLink(data){
    
   let data1 = JSON.stringify(data);
   this.router.navigate(['frontView',{viewData:data1}],{skipLocationChange: true});
  }


}
