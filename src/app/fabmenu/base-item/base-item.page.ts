import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { PopoverController, LoadingController } from '@ionic/angular';
import { DropdownComponent } from 'src/app/component/dropdown/dropdown.component';

@Component({
  selector: 'app-base-item',
  templateUrl: './base-item.page.html',
  styleUrls: ['./base-item.page.scss'],
})
export class BaseItemPage implements OnInit {
  data;
  optArray = [];
  selArray = [];
  btnArray = [];
  selTypeArray = [];
  d = [];
  val;
  url;
  constructor(private router:Router,
              private actRouter:ActivatedRoute,
              private apiService:ApiService,
              private popoverController:PopoverController,
              private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.actRouter.params.subscribe(res =>{
      this.data = JSON.parse(res.element);
      if(this.data && this.data.questionnaire && this.data.questionnaire.formfields){


      console.log( 'FABDATA :', this.data.questionnaire.formfields);
      this.btnArray = this.data.questionnaire.formfields;
    }
       this.url = this.data['depoint_dynamic_audience'].ajaxurl;
       this.apiService.getfabformData(this.url).subscribe(res =>{
         this.optArray = res.results;
       
       });
     
    })
  }
  onClkBtn(data){
     this.d.push(data);
      console.log('ITEM ',this.d);
  }
  searchItem(e){
  console.log(e);
  let str = e.detail.value;
this.showLoading();
  this.apiService.getfabformSearchData(this.url,str).subscribe(res =>{
    this.optArray = res.results;
    this.presentPopover(res);
    this.loadingCtrl.dismiss();
 
     
  });
  
   str='';

  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',  
      duration:2000,
      cssClass:'txt'
    });
    return await loading.present();
  }
 
  clkItem(item){
 console.log(item);
  }
  async presentPopover(res) {
    let a = [];
    const popover = await this.popoverController.create({
      component: DropdownComponent,     
      translucent: true,
      componentProps:{data:res}
      
    });
    popover.onDidDismiss().then(res=>{
         
          a = res.data;
          a.forEach(element=>{
            this.selArray.push(element);
          });
          console.log('SW :',this.selArray);
    });
    return await popover.present();
    
  }
  onDidDismiss(){
    console.log('MIUSS');
  }
  delArray(i){
    const index: number = this.selArray.indexOf(i);
    if (index !== -1) {
        this.selArray.splice(index, 1);
    } 
  }
  searchItem2(e,arr){
    console.log(arr);
    this.presentPopover2(arr);
  }
  async presentPopover2(res) {
    let a = [];
    const popover = await this.popoverController.create({
      component: DropdownComponent,     
      translucent: true,
      componentProps:{data:res}
      
    });
    popover.onDidDismiss().then(res=>{
         
          a = res.data;
         
          console.log('SW :',a);
    });
    return await popover.present();
    
  }
}
