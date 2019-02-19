import { QuestionControlService } from './../../service/question-control.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionBase } from 'src/app/modal/question-base';
import { FormGroup } from '@angular/forms';
import { AwsService } from 'src/app/service/aws.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { SignatureComponent } from '../signature/signature.component';
@Component({
  selector: 'app-question-form-field',
  templateUrl: './question-form-field.component.html',
  styleUrls: ['./question-form-field.component.scss']
})
export class QuestionFormFieldComponent implements OnInit {
  imgFile;
  imageURI:any;
  imageFileName:any;
  lastImage: any[] = [];

  yesNo = 'Yes';
  qid;
  submitted = false;
  photoName;
  text: string;
  selectedFiles: FileList;
  @Input() question: QuestionBase<any>[]=[];
  @Input() form: FormGroup;
  @Input() deleteFile: boolean;
  
 
  signatureImg: string;
  yesno = true;
  arr:any[] = [];
  showInput = true;
  @Output() myEvent = new EventEmitter<{req:boolean}>();
  @Output() showdeleteEvent = new EventEmitter<boolean>();
  getFile:any;
  imageURL;
  uploadImg;
  aws;
  qstArray = [];
  showPreview = true;
  required:boolean;
  constructor(private awsProvider:AwsService,
              private camera:Camera,
              private modalCtrl:ModalController,
              private qc:QuestionControlService) { 
              
              }

  ngOnInit() {
    // this.qstArray.push(this.question[0]);   
    // this.form = this.qc.toFormGroup(this.question);
 
  }
  
  
  public selectdocFile(e,qid) {  
    this.uploadImg = true;
 
    this.selectedFiles = e.target.files;  
   
    this.getFile = e.target.files[0].name;
    if(this.getFile!=undefined){
     
      this.showdeleteEvent.emit(true);
      this.showInput = false;
    }else{
      this.showInput = true;
    }

    let indx = Object.keys(this.selectedFiles);
         let fileNames = '';
         indx.forEach(element =>{
          fileNames = this.selectedFiles[element].name;
         })
       
       
    this.form.controls[qid].setValue(fileNames);
 
   
  }
  public chkData(e,d){
  

  }
  clkDel(){
  
    this.showInput = true;
  }
  toggleYes(qid){
  //  this.myEvent.emit({req:true});
    this.yesno =!this.yesno;
    this.form.get(qid).setValue('yes');   
  }
  toggleNo(qid){
  //  this.myEvent.emit({req:false});
    this.yesno =!this.yesno;
    this.form.get(qid).setValue('no');  
  }
  private createFileName(type) {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n +'.'+type;
    return newFileName;
  }
  async openModal(){
   
    const modal = await this.modalCtrl.create({
      component: SignatureComponent,
      componentProps: { question: this.question}
    });
    modal.onDidDismiss().then((data:any) => {
    
      
      this.signatureImg = data.signature;
      let k = data['data'].qid;
      let v = data['data'].name;
      this.form.get(k).setValue(v);
         
    })
    return await modal.present();
  }
  takePicture(e,qid){
 
    var options : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true,
      correctOrientation: true
  };
     // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
   

    let base64 ='data:image/jpeg;base64,' + imagePath;
    const base64Data = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = base64.split(';')[0].split('/')[1];
    let imageName = this.createFileName(type);
    this.photoName = imageName;
    this.imageURL = base64;
  
   
    this.showPreview = false;
    this.showdeleteEvent.emit(true);

  

 this.form.get(qid).setValue(imageName); 
 this.awsProvider.uploadCamera(base64Data,imageName,type,this.aws);
   
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });

  }


  req(i){
    
     if("1"==i){
   //   this.myEvent.emit({req:true});
       return true;
     }else{
    ///  this.myEvent.emit({req:false});
       return false;
     }
 //   console.log('AAAAAAAAAAA :',i);
  }

 
// Copy the image to a local folder

 
private presentToast(text) {
  // let toast = this.toastCtrl.create({
  //   message: text,
  //   duration: 3000,
  //   position: 'top'
  // });
  // toast.present();
}
 
clkCameraDelBtn(e){
  
  this.showPreview = true;
  
  this.imageURL = '';
  let fileName =e;

  
//  this.awsProvider.deletePhoto(fileName,this.question.aws);

  }
   public clkDelBtn(e){
   
    this.showInput = true;
    //this.awsProvider.deleteFile(e,this.question.aws);
   
    // this.sl = true;
//this.showInput = false;
     // this.cnt = this.cnt + 1;
   //   this.showInput = e;
 
   
   // this.getFile ='';
   // this.showdeleteEvent.emit(false);
   
  }

 

upload(f) {
  const files = f;
  
  for(let i=0;i<files.length;i++){ 
 //this.awsProvider.uploadfile(files.item(i),this.question.aws);
  }
  
}

changeValue(e,qid,aid){

  
// this.arr.push(aid);
// this.form.patchValue({qid:this.arr});
this.form.get(qid).setValue(aid);
}

}
