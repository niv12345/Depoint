import { DetailPageModule } from './detail/detail.module';


import { ComponentModule } from './../component/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';

import { FrontViewPage } from './front-view.page';
import { FabmenuListPage } from '../fabmenu/fabmenu-list/fabmenu-list.page';

const routes: Routes = [
  {
    path: '',
    component: FrontViewPage,
  
  },
  {
    path:'detail',
    component:DetailPageModule
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
    
  ],
  declarations: [FrontViewPage],
  entryComponents: [],
  providers:[
    
  ]
})
export class FrontViewPageModule {}
