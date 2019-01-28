import { Component, OnInit, OnChanges } from '@angular/core';
import { NavController, LoadingController, PopoverController, MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  text: string;

  userData: any;
  userProfile;
  immediateAct=[];
  firstName: string;
  lastName: string;
  usreRole: string;
  userBranch: string;
  fabMenus ;
  fabMenu_2 = [];
  profilePic;
  bdgeData = [];
  frontPage = [];
  bdgeEarth;
  searchTxt='';
  bdgeBell;
  limit = 2;
 toggled = false;
 logo:string;
  constructor(private navCtrl:NavController,
              private loadingCtrl:LoadingController,
              private popoverCtrl:PopoverController,
              private apiService:ApiService,
              private router:Router,
              private menu: MenuController
             ) {
              this.logo = localStorage.getItem('BASE_URL')+localStorage.getItem('LOGO');
                this.userData = JSON.parse(localStorage.getItem('USER'));
    console.log('USR :',this.userData);
 
  }
  ngOnInit(){   
   
    this.bdgeData = this.userData.data.open_action_total;
    this.bdgeEarth = this.bdgeData!=null || this.bdgeData!=undefined ?  this.bdgeData:'0';
    this.userProfile = this.userData.data.profile; 
    this.frontPage = this.userData.data.frontpage;
    this.bdgeBell =this.userData.data.immidiate_action.length;
   }
   ngOnChanges(){
    this.logo = localStorage.getItem('BASE_URL')+localStorage.getItem('LOGO');
    this.userData = JSON.parse(localStorage.getItem('USER'));
   }

   public toggle(): void {
     this.toggled = !this.toggled;
  }
  public openMenu(){
    this.menu.enable(true, 'first');
    this.menu.swipeEnable(false);
    this.menu.open('first');
  }
//   showLoading() {
//      this.loading = this.loadingCtrl.create({
//      content: 'Please wait...',
//      dismissOnPageChange: true
//    });
//    this.loading.present();
//  }
ionViewWillEnter() {
  this.menu.swipeEnable(false);
  this.menu.enable(false);
}
ionViewDidLeave() {
  this.menu.swipeEnable(false);
  // enable the root left menu when leaving the tutorial page
  this.menu.enable(true);
}
  onClkGlobe(){
 //   this.showLoading();
    this.router.navigate(['/tickets']);
      }
  
  onClkFab(){
  //    this.showLoading();
      this.apiService.GetFabMenu().subscribe(res => {      
        this.fabMenus = res.data.data;
        this.fabMenu_2 = this.fabMenus.menu_2;     
        // const popover = this.popoverCtrl.create('fabmenu-list',{key:this.fabMenu_2});
        //   popover.present();
       //   this.loading.dismiss();
      });
    
    }
   
  public dismiss() {
  //    this.viewCtrl.dismiss();
    }
  
  openLink(data){
    //  this.showLoading();
  //    this.navCtrl.navigatByUrl('frontview',{viewData:data});
    }
  
  onClkBell(){
    //  this.showLoading();
      this.router.navigate(['/notification']);
    }
  
  getItems(ev: any) {
   //   this.showLoading();
      const val = ev.target.value;
  console.log('VAAL :',val);
    this.apiService.SearchItem(val).subscribe(res =>{
    //  this.loading.dismiss();
      if(res.data.items.length>0){
    //    this.navCtrl.navigateForward('frontview',{search:res.data.items});
        this.searchTxt = '';
        this.toggled = false;
      }else{

      }
     
    });
  //  }
      // if (val && val.trim() != '') {
      //   this.items = this.items.filter((item) => {
      //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //   })
      // }
  }
  cancelSearch(e){
  this.searchTxt = '';
  }
  onClkLogo(){
    this.navCtrl.navigateRoot('home');
  }


}
