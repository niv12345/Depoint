import { QuillModule } from 'ngx-quill';
import { ComponentModule } from 'src/app/component/component.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BaseItemPage } from './base-item.page';
import { FroalaViewModule, FroalaEditorModule } from 'angular-froala-wysiwyg';


const routes: Routes = [
  {
    path: '',
    component: BaseItemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   
    ComponentModule,
    QuillModule.forRoot({
      modules: {
        syntax: true
      }
    }),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [BaseItemPage]
})
export class BaseItemPageModule {}
