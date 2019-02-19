import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionBase } from 'src/app/modal/question-base';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { AwsService } from 'src/app/service/aws.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Base64 } from '@ionic-native/base64/ngx';
@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit {



  ngOnInit() {
 
  }
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;
  question: QuestionBase<any>;
  data = {signature:'',name:'',qid: ''};
  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage ;
  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               private modalctrl:ModalController,
               private awsProvider: AwsService,
               private base64: Base64) {
                           this.question = this.navParams.get('question');
  }

  drawCancel() {
                 this.modalctrl.dismiss();
 }
 dataURItoBlob(dataURI) {
  const byteString = atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });    
  return blob;
}
   drawComplete() {
     debugger;
                this.signatureImage = this.signaturePad.toDataURL();
              
                let sign1 = this.signaturePad.toDataURL();
                let sign =sign1.split(',')[1];
                const imageBlob =this.dataURItoBlob(sign);
               
             //   console.log('SP :',new Blob(sign1,'image/png'));
                console.log('SP 2:',sign1.split(',')[1]);
                
                let filePath: any = sign1;
              
// this.base64.encodeFile(filePath).then((base64File: string) => {
//   sign = base64File;
//   console.log(base64File);
// }, (err) => {
//   console.log(err);
// });
               // const base64Data = new Buffer(sign.replace(/^data:image\/\w+;base64,/, ""), 'base64');
              //  const type = sign.split(';')[0].split('/')[1];
                let type = 'jpeg';
                let imageName = this.createFileName();
                const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
                this.data.signature = this.signatureImage;
                this.data.name = imageName;
                this.awsProvider.uploadfile(imageFile,this.question.aws);
                this.data.qid =  this.question.id;
                this.modalctrl.dismiss(this.data); 
    }
    private createFileName() {
                var d = new Date(),
                n = d.getTime(),
                newFileName =  'sign-'+n +'.png';
                return newFileName;
  }
  drawClear() {
                this.signaturePad.clear();
  }

}
