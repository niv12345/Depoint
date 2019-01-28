
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';





const routes: Routes = [

  { path: 'home', loadChildren: './home/home.module#HomePageModule' ,canActivate:[AuthGuardService]  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }, 
  { path: 'fab-form', loadChildren: './fabmenu/fab-form/fab-form.module#FabFormPageModule'},
  { path: 'frontView', loadChildren: './front-view/front-view.module#FrontViewPageModule' },
  { path: 'notification', loadChildren: './notifications/notifications.module#NotificationsModule' },
  { path: 'detail', loadChildren: './front-view/detail/detail.module#DetailPageModule' },
  { path: 'detail-page', loadChildren:'./notifications/detail/detail.module#DetailPageModule'},
  { path: 'tickets', loadChildren:'./tickets/tickets.module#TicketsModule'},  
  { path: 'ticket-list',loadChildren:'./tickets/ticket-type-list/ticket-type-list.module#TicketTypeListPageModule'},
  { path: 'ticket-desc',loadChildren:'./tickets/ticket-detail/ticket-detail.module#TicketDetailPageModule'},
  { path: 'questionaire',loadChildren:'./questionaire/questionaire.module#QuestionaireModule'},
  { path: 'list',loadChildren:'./questionaire/question-list/question-list.module#QuestionListPageModule'},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
 
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule',canActivate:[AuthGuardService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
