import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

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
              private router:Router) { 
                
                this.fabMenu = this.navParam.get('key');
               
              }

  ngOnInit() {
  }
  onClkBox(selectedItem){
    console.log('SSEL :',selectedItem);
   
    if(selectedItem.published == 1){
        this.apiService.GetFabFormData(selectedItem.appurl).subscribe(res =>{
       
        
          if(res.data.fields != null || res.data.fields != undefined){
            this.key = Object.keys(res.data.fields); 
            console.log('JAKA :', this.key);
            if(res.data.fields[this.key] != undefined){
            this.fabFormData = res.data.fields[this.key].fielddata;
           
             this.router.navigate(['fab-form',{
                                                formdata:JSON.stringify(this.fabFormData),
                                                itemtitle:JSON.stringify(selectedItem.title),
                                                typeid:JSON.stringify(res.data.type_id),
                                                key:JSON.stringify(this.key) }],{skipLocationChange: true});
            // this.navCtrl.push('fablist-form',{formdata:this.fabFormData,
            //                                   itemtitle:selectedItem.title,
            //                                   typeid:res.data.type_id,
            //                                   key:this.key});
            this.modalControl.dismiss(null,undefined);
            console.log('JAK :', this.fabFormData);
            }
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
