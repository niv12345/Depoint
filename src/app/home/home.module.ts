import { ComponentModule } from './../component/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';






@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({hardwareBackButton: false}),
    ComponentModule,
   
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  
  ],
  declarations: [HomePage],
  
})
export class HomePageModule {}
