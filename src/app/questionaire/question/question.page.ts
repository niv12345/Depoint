import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  questinaryData:any;
  questionArray = [];
  showContent ;
  cuname;
  cdate;
  itemID;
  typeID;catID;
  constructor(private route:ActivatedRoute,
              private router:Router) { 
                          let qdata;
                          this.route.params.subscribe(res =>{
                          qdata = JSON.parse(res.item);
                   
                          this.itemID = qdata.id;
                          this.typeID = qdata.type_id;
                          this.catID = qdata.catid;
                          if(qdata!=undefined){

                            this.questinaryData = qdata;
                            this.cuname =  this.questinaryData.cuname;      
                            this.cdate = this.questinaryData.created;
                            }else{
                            
                              this.questinaryData = JSON.parse(qdata);
                              this.cuname =  this.questinaryData.cuname;
                              this.cdate = this.questinaryData.created;
                            }
                          });

  }

  ngOnInit() {
                  if(this.questinaryData==undefined){
                  // this.questinaryData = JSON.parse(localStorage.getItem('QDATA'));
                    this.cuname =  this.questinaryData.cuname;
                    this.cdate = this.questinaryData.created;
                  }
                //  this.showContent = true;
                  if(this.questinaryData){
                  
                  this.questionArray = this.questinaryData.fields.questionnaire;
                 
                //  localStorage.setItem('QUESTARRAY',JSON.stringify(this.questionArray));
                  }
  }
  goToQuestion(quest){
    this.router.navigate(['/list',{item:JSON.stringify(quest),
                                   itemid:this.itemID,
                                   typeid:this.typeID,
                                   catid:this.catID}],{skipLocationChange:true});
  }
 
}
