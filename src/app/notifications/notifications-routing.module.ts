import { NotificationPageModule } from './notification/notification.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:'./notification/notification.module#NotificationPageModule',
  },
  {
        path:'detail-page',
        loadChildren: './detail/detail.module#DetailPageModule',
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
