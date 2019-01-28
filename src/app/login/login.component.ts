import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, Platform, MenuController, AlertController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { DataService } from '../service/data.service';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
var deviceid;
export interface reg{
  username:string;
  password:string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ngForm:FormGroup;

  ngOnInit() {
   // this.presentAlertRadio();
  }
  titleUsrname = '';
  titlePwd = '';
  lang: any;
  userData: any;
 cliList = [];
 cliName = [];
 baseURL:string;
 showList:boolean = true;
 logo:string;
  registerCredentials = {username:'',password:''};
  constructor(public navCtrl: NavController,             
              private apiService:ApiService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private platform:Platform,
              private fb:FormBuilder,
              private menuCtrl:MenuController,
              private dataService:DataService,
        
              private authService:AuthenticationService,
              private router:Router,
              private alertController:AlertController) {
                 this.init();
                }
  
  init(){
    
   this.apiService.getClientList().subscribe(res =>{
    res.data.customers.forEach(element => {
     
      this.cliList.push(element);
    });
    this.cliList.forEach(ele =>{
      this.cliName.push(ele.split('.')[0]);
    //  console.log('LIST :', ele.split('.')[0]);
    //  this.cliName.push({ name : ele.split('.')[0], value: ele.split('.')[0], label: ele.split('.')[0], type: 'radio' });
    })
  //  console.log('LIST :', this.cliName);
   })
 
         
          this.ngForm = this.fb.group({
            username:new FormControl('',Validators.required),
            password:new FormControl('',Validators.required)
          });
        //  this.presentAlertRadio();
          this.registerCredentials.username ='';

    
  }
 
  getLang(url){
    localStorage.removeItem('LOGO');
    this.apiService.GetLang(url).subscribe(res => {
      this.lang = res.data; 
      this.logo = localStorage.getItem('BASE_URL')+res.data.uisettings.login_logo;
     // console.log('LA :',this.lang);
      localStorage.setItem('LOGO',res.data.uisettings.logo);
    if(this.platform.is('android')){
      // this.oneSignal.startInit(this.lang.onesignal_id, this.lang.firebase_key);
      // this.oneSignal.getIds().then(res =>{
      // deviceid = res;       
      //   localStorage.setItem('PL',JSON.stringify(res));
      // });
  
//   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
  
//   this.oneSignal.handleNotificationReceived().subscribe(() => {
//   // do something when notification is received
//   });

// this.oneSignal.handleNotificationOpened().subscribe((res) => {
// // alert(JSON.stringify(res));
// // do something when a notification is opened
// });

// this.oneSignal.endInit();
}

//  console.log('LANG ID :',this.lang.onesignal_id);
//  console.log('LANG KEY:',this.lang.firebase_key);
//  console.log('LANG OKEY:',this.lang.onesignal_key);
 if(this.lang){
 this.titleUsrname =  res.data.language.USERNAME;
 this.titlePwd = res.data.language.PASSWORD;
 //this.loading.dismiss();
 }else{
//   this.loading.dismiss();
 }
 
})
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',  
      duration:2000,
      cssClass:'txt'
    });
    return await loading.present();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  authentication(){
   this.showLoading();
  let use = this.ngForm.value.username;
  
 
    localStorage.removeItem('USER');
    this.apiService.SetUserLogin(this.ngForm,deviceid)
                        .subscribe(res =>{
                      
                              if(res.data.id>0){
                                this.loadingCtrl.dismiss();
                                this.userData = res.data;                                
                            //    this.dataService.setData(JSON.stringify(res));
                                localStorage.setItem('USER',JSON.stringify(res));
                                localStorage.setItem('AUTH_KEY',this.userData.auth); 
                        
                              this.authService.login();
                        
                           
                              this.presentToast('Login successfully');
                              this.ngForm.reset();
                              this.router.navigate(['/home']);
                              this.showList = !this.showList;
                             
  
      }else{
        this.presentToast('Invalid username or password');      
        this.registerCredentials.username = '';
        this.registerCredentials.password = '';        
      }
    })

  }
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  onSelectItem(e,index){
    console.log(e);
    let cUrl = this.cliList[index];
    this.baseURL = 'https://'+cUrl;
    localStorage.removeItem('BASE_URL');
    console.log('ITEM :', index);
  }
  onClkItem(){
    this.showList = !this.showList;
    this.showLoading();
    localStorage.setItem('BASE_URL',this.baseURL);
   
    this.getLang(this.baseURL);
 
  }
onclkFingerprint(){
 // this.navCtrl.push('finger-auth');
}
async presentAlertRadio() {
 
  var alert = await this.alertController.create();
  for(let i=0; i< this.cliName.length; i++) {
    alert.inputs = [{
           name: this.cliName[i],
            type: 'radio',
            label: this.cliName[i],
            value: this.cliName[i]
    }]
 }
  alert.header = 'Clients';
 
  alert.buttons = [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ];
  //{
  //   header: 'Radio',
    
  //   buttons: [
  //     {
  //       text: 'Cancel',
  //       role: 'cancel',
  //       cssClass: 'secondary',
  //       handler: () => {
  //         console.log('Confirm Cancel');
  //       }
  //     }, {
  //       text: 'Ok',
  //       handler: () => {
  //         console.log('Confirm Ok');
  //       }
  //     }
  //   ]
  // });
//   alert.inputs(type:'radio');
// alert.inputs(
//   type: 'checkbox',
//   label: this.keywords[i],
//   value: i.toString(),
//   checked: this.isTrue[i] as boolean
// )
 
 

 
  //options.inputs = [];
  //Object.defineProperty(options, "inputs", {value:[]})

 
 
 
  await alert.present();
}
}
