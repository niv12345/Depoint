import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TicketListPage } from './ticket-list.page';
import { ComponentModule } from 'src/app/component/component.module';

const routes: Routes = [
  {
    path: '',
    component: TicketListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TicketListPage]
})
export class TicketListPageModule {}
