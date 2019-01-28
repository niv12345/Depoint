import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ModalController } from '@ionic/angular';
import { FabmenuListPage } from 'src/app/fabmenu/fabmenu-list/fabmenu-list.page';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  fabMenus;
  fabMenu_2;
  constructor(private apiService:ApiService,
              private modalController:ModalController) { }

  ngOnInit() {
  }
  async  onClkFab(){
   
    this.apiService.GetFabMenu().subscribe(res => {      
      this.fabMenus = res.data.data;
      if( this.fabMenus && this.fabMenus.menu_2){
      this.fabMenu_2 = this.fabMenus.menu_2;     
     this.modalctrl(this.fabMenu_2);
    }
    });

  }
  async modalctrl(data){
    const modal = await this.modalController.create({
      component:FabmenuListPage,
      componentProps:{
        key:data
      }
      
    });
    return await modal.present();
  }
}
