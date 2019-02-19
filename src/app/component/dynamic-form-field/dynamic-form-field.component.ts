import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController, Platform, LoadingController, ModalController } from '@ionic/angular';
import { QuestionBase } from 'src/app/modal/question-base';
import { AwsService } from 'src/app/service/aws.service';
import { SignatureComponent } from '../signature/signature.component';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent implements OnInit {
  imgFile;
  imageURI:any;
  imageFileName:any;
  lastImage: any[] = [];
 
  yesNo = 'Yes';
  qid;
  text: string;
  selectedFiles: FileList;
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  signatureImg: string;
  get isValid() { return this.form.controls[this.question.id].valid; }
  constructor(public navCtrl: NavController,  
              public platform: Platform, 
              public loadingCtrl: LoadingController,
              private awsProvider: AwsService,
              private modalCtrl: ModalController) {
   
                this.yesNo = 'Yes';
   
              
  }
  ngOnInit(){
    
  }
  
  async openModal(data){
   
    const modal = await this.modalCtrl.create({
      component:SignatureComponent,
      componentProps:{
        question:data
      }      
    });
    modal.onDidDismiss().then((data:any) => {
    
        this.signatureImg = data.signature;
        let val = JSON.stringify(this.signatureImg);
        let k = data['data'].qid;
        let v = data['data'].name;    
        this.form.get(k).setValue(v);
  });
    return await modal.present();
 }
  public selectFile(e,qid) {
  
    this.selectedFiles = e.target.files;   
    let indx = Object.keys(this.selectedFiles);
         let fileNames = '';
         indx.forEach(element =>{
          fileNames = fileNames + ','+this.selectedFiles[element].name;
         })
      
    this.form.controls[qid].setValue(fileNames);    
    this.upload();
  }
 
  toggleYes(qdata){
    
    if(qdata.value){     
      this.yesNo = 'No';
    }else{
      this.yesNo = 'Yes';     
    }      
  }
 

 

upload() {
  const files = this.selectedFiles;
  console.log('FIMG :',files);
  for(let i=0;i<files.length;i++){ 
  this.awsProvider.uploadfile(files.item(i),this.question.aws);
  }
  
}
changeValue(e,qid,aid){
  console.log('AID :',e);
  // this.arr.push(aid);
  // this.form.patchValue({qid:this.arr});
  this.form.get(qid).setValue(aid);
  }
  
}
