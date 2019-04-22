import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-fabmenu-list',
  templateUrl: './fabmenu-list.page.html',
  styleUrls: ['./fabmenu-list.page.scss'],
})
export class FabmenuListPage implements OnInit {
  fabMenu;

  fabFormData = [];
  @Input() key:any;
  constructor(private apiService:ApiService,
              private navParam:NavParams,
              private modalControl:ModalController,
              private loadingCtrl:LoadingController,
              private router:Router) { 
                
                this.fabMenu = this.navParam.get('key');
               
              }

  ngOnInit() {
    this.showLoading();
    setTimeout(()=>{
      this.loadingCtrl.dismiss();
    },1000)
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',  
      cssClass:'txt'
    });
    return await loading.present();
  }
  onClkBox(selectedItem){
   
   this.showLoading();
    if(selectedItem.published == 1){
        this.apiService.GetFabFormData(selectedItem.appurl).subscribe(res =>{
      
        
          if(res.data.fields != null || res.data.fields != undefined){
            this.key = Object.keys(res.data.fields); 
           
            this.key.forEach(element => {
              if(res.data.fields[element] && res.data.fields[element].field_type!=undefined && res.data.fields[element].field_type == "questionnairedisplay"){
               
                this.fabFormData = res.data.fields[element].fielddata;
                this.router.navigate(['fab-form',{
                  formdata:JSON.stringify(this.fabFormData),
                  itemtitle:JSON.stringify(selectedItem.title),
                  typeid:JSON.stringify(res.data.type_id),
                  key:JSON.stringify(element) }],{skipLocationChange: true});
                  this.loadingCtrl.dismiss();

              this.modalControl.dismiss(null,undefined);
              }else{
                
                 this.modalControl.dismiss(null,undefined);
                this.loadingCtrl.dismiss();
                this.router.navigate(['base-item',{element:JSON.stringify(res.data.fields)}],{skipLocationChange:true});
              }
            });
            // if(res.data.fields[this.key].field_type == "questionnairedisplay"){
            // this.fabFormData = res.data.fields[this.key].fielddata;
           
            //  this.router.navigate(['fab-form',{
            //                                     formdata:JSON.stringify(this.fabFormData),
            //                                     itemtitle:JSON.stringify(selectedItem.title),
            //                                     typeid:JSON.stringify(res.data.type_id),
            //                                     key:JSON.stringify(this.key) }],{skipLocationChange: true});
            // // this.navCtrl.push('fablist-form',{formdata:this.fabFormData,
            // //                                   itemtitle:selectedItem.title,
            // //                                   typeid:res.data.type_id,
            // //                                   key:this.key});
            // this.modalControl.dismiss(null,undefined);
            console.log('JAK :', this.fabFormData);
          //  }
          }else{
           alert('Data not available');
          }
           
         
        });
       
      
    }
    
   // this.navCtrl.push(VocationRequestPage);
  }
  clkClose(){
   this.modalControl.dismiss();
  }
}
