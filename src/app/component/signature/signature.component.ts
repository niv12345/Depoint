import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionBase } from 'src/app/modal/question-base';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { AwsService } from 'src/app/service/aws.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

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
              private awsProvider: AwsService) {
                           this.question = this.navParams.get('question');
  }

  drawCancel() {
                 this.modalctrl.dismiss();
 }

   drawComplete() {
                this.signatureImage = this.signaturePad.toDataURL();
                let sign = this.signaturePad.toDataURL();
                //const base64Data = new Buffer(sign.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                //const type = sign.split(';')[0].split('/')[1];
                let type = 'jpg';
                let name = this.createFileName();
                this.data.signature = this.signatureImage;
                this.data.name = name;
                this.awsProvider.uploadCamera(sign,name,type,this.question.aws);
                this.data.qid =  this.question.id;
                this.modalctrl.dismiss(this.data); 
    }
    private createFileName() {
                var d = new Date(),
                n = d.getTime(),
                newFileName =  'sign-'+n +'.jpg';
                return newFileName;
  }
  drawClear() {
                this.signaturePad.clear();
  }

}
