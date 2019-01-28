import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from 'src/app/modal/field.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { NavController } from '@ionic/angular';
import { QuestionBase } from 'src/app/modal/question-base';
import { QuestionControlService } from 'src/app/service/question-control.service';

@Component({
  exportAs:'dynamicForm',
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() question: QuestionBase<any>[] = [];
  @Input() typeid:string;
  @Input() qsttitle:string;
  awsData;
  text: string;
  form: FormGroup;
  payLoad = '';
  data = [];
  
  constructor(private qc: QuestionControlService,
              private apiService: ApiService,
              private navCtrl: NavController) { }
  ngOnInit(){
    this.form = this.qc.toFormGroup(this.question);
  }
 
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);  
    this.data = this.form.value; 
 
    this.apiService.PostQuestion(this.qsttitle,this.data,this.typeid).subscribe(res =>{    
      if(res.data.status === 1){
       
      }else{
      }
      
    try{
        if(res.aws!=undefined){
        this.awsData = res.aws;       
        }   
      }catch(e){}
        
      });      
  }

  onClkClose(){
    this.form.reset();
    this.navCtrl.navigateBack('/home');  
  }

}
