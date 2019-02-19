import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from 'src/app/modal/question-base';
import { QuestionControlService } from 'src/app/service/question-control.service';
import { ApiService } from 'src/app/service/api.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  @Output() percentEvent = new EventEmitter<{percent:any}>()
  @Input() question: QuestionBase<any>[] = [];
  @Input() ids:{};
  //@ViewChild(QuizFormQuestionComponent) qstForm: QuizFormQuestionComponent;
  text: string;
  form: FormGroup;
  qstArray = [];
  index:number = 0;
  data = [];
  
  delFile = false;
  showDone = false;
  showDel = false;
  showInput = true;
  disableNxt = true;
  req:boolean = false;
  constructor(private qc: QuestionControlService,
              private apiService:ApiService,
              private navCtrl:NavController,
              private toastCtrl:ToastController) { 
                this.qstArray.push(this.question[0]);   
               
                this.form = this.qc.toFormGroup(this.question);
          
              }

  ngOnInit() {
    this.qstArray.push(this.question[0]);  
    console.log(this.qstArray);
    this.form = this.qc.toFormGroup(this.question);

  }
  onClkNext(e){ 
    this.disableNxt = true;
    this.showDel = false;
    var element = document.getElementById("myLabel");
    setTimeout(()=>{
                   element.scrollIntoView(true)
                   },200);
                  
   if(this.question.length >= this.index){
    this.percentEvent.emit({percent:this.index+1});
    this.qstArray.push(this.question[this.index+1]);
   // this.qstForm.uploadS3(this.question[this.index],this.qstForm.selectedFiles);
    this.index = this.index + 1;   
    if(this.question.length == this.index){
      this.showDone = true;
    }
  }
  }

  saveQuestionnaire(){
   
    this.data = this.form.value;

    this.apiService.PostQuiz(this.ids,this.data).subscribe(res =>{
        this.presentToast('Questionairy saved successfully');    
        this.navCtrl.navigateRoot('/home');
    });
 
 
  }
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  showDeleteBtn(e:any){
    this.showDel = e;
  
  }
  onClkDelete(v){
   // this.qstForm.clkDelBtn(v);
  }
}
