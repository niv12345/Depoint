import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    loadChildren:'./ticket-list/ticket-list.module#TicketListPageModule'
  }
  // },
  // { 
  //   path: 'ticket-type-list', 
  //   loadChildren: './ticket-type-list/ticket-type-list.module#TicketTypeListPageModule' 
  // },
  // { 
  //   path: 'ticket-desc',
  //   loadChildren:'./ticket-detail/ticket-detail.module#TicketDetailPageModule'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
