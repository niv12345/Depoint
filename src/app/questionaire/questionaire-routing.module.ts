import { QuestionListPage } from './question-list/question-list.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{
  path:'',
  loadChildren:'./question/question.module#QuestionPageModule',
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionaireRoutingModule { }
