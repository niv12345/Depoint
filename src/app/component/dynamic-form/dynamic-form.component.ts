import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from 'src/app/modal/field.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { NavController, ToastController } from '@ionic/angular';
import { QuestionBase } from 'src/app/modal/question-base';
import { QuestionControlService } from 'src/app/service/question-control.service';
import { Router } from '@angular/router';

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
              private navCtrl: NavController,
              private router:Router,
              private toastCtrl:ToastController) { }
  ngOnInit(){
    this.form = this.qc.toFormGroup(this.question);
  }
 
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);  
    this.data = this.form.value; 
   console.log('QDATA :',this.data);
    this.apiService.PostQuestion(this.qsttitle,this.data,this.typeid).subscribe(res =>{    
      if(res.data.status === 1){
        this.presentToast(res.data.message);
       this.router.navigateByUrl('/home');
      }else{
      }
      
    try{
        if(res.aws!=undefined){
        this.awsData = res.aws;       
        }   
      }catch(e){}
        
      });      
  }
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  onClkClose(){
    this.form.reset();
    this.navCtrl.navigateBack('/home');  
  }

}
