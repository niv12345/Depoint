import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NavController, IonNavPop } from '@ionic/angular';
interface ids{
  itemid:string;
  questionid:string;
  typeid:string;
  catid:string;
}
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage implements OnInit {
  questions :any;
  questionArray = [];
  index= 0;
  per:number = 0;
  form:FormGroup; 
  ids:ids;
  constructor(private route:ActivatedRoute,
              private navCtrl:NavController,
             
              private router:Router) {
    let data =[];
    this.route.params.subscribe(res=>{
     
      this.questions = JSON.parse(res.item);
      let itemID = res.itemid;
      let questionID = this.questions.id;  
      let typeID = res.typeid; 
      let catId = res.catid;  
      this.ids = {'itemid':itemID,'questionid':questionID,'typeid':typeID,'catid':catId};
     
      data = this.questions.fielddata;   
      data.forEach(ele =>{
         if(ele.status == 1){           
           this.questionArray.push(ele);
         }
       }); 
    });
   }

  ngOnInit() {
  }
  progressViewer(event){
              this.index = event.percent;
              let total = this.questionArray.length;
              let perc;
              if(this.index>0){
                perc = ((this.index)/total)*100;
              this.per = perc.toFixed(2);
                }else{
                this.per = 0;
                }
      }
      onClkCancel(){
        this.navCtrl.navigateRoot('/home');
        
     }
}
