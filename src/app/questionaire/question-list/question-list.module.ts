import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {ProgressBarModule} from "angular-progress-bar"
import { IonicModule } from '@ionic/angular';

import { QuestionListPage } from './question-list.page';
import { ComponentModule } from 'src/app/component/component.module';

const routes: Routes = [
  {
    path: '',
    component: QuestionListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    ProgressBarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuestionListPage],
  providers:[
    
  ]
})
export class QuestionListPageModule {}
