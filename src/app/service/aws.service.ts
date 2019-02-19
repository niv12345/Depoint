import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
@Injectable({
  providedIn: 'root'
})
export class AwsService {

  FOLDER = 'images/';
  apiUrl = 'https://masterheb.depoint.co/';
  access_key:string;

  constructor() {
  }
  ngOnChanges(){

  }
  uploadfile(file,aws) {
 
    const bucket = new S3(
      {
        accessKeyId: aws.aws_key_id,
        secretAccessKey: aws.aws_key_secret,
        region: ''
      }
    );
 
    const params = {
      Bucket: aws.aws_bucket,
    //  Key: aws.aws_folder!=undefined || aws.aws_folder!=''?aws.aws_folder+'/':'images/'+ file.name, 
      Key: this.FOLDER +  file.name, 
      Body: file
    };
 
    bucket.upload(params, function (err, data) {
      
      if (err) {
      //alert('There was an error uploading your file: '+ err);
        return false;
      }
 
    // alert('Successfully uploaded file.'+data);
      return true;
    });
  }
 
  deleteFile(file,aws){
   
    const bucket = new S3(
      {
        accessKeyId: aws.aws_key_id,
        secretAccessKey: aws.aws_key_secret,
        region: ''
      }
    );
 
    bucket.deleteObject({
      Bucket: aws.aws_bucket,
   //   Key: aws.aws_folder!=undefined || aws.aws_folder!=''?aws.aws_folder+'/':'images/'+ file[0].name  
      Key: this.FOLDER + file[0].name     
    },function (err,data){
      console.log('DD :',err);
    })
  }
  deletePhoto(file,aws){
   
    const bucket = new S3(
      {
        accessKeyId: aws.aws_key_id,
        secretAccessKey: aws.aws_key_secret,
        region: ''
      }
    );
 
    bucket.deleteObject({
      Bucket: aws.aws_bucket,
    //  Key: aws.aws_folder!=undefined || aws.aws_folder!=''?aws.aws_folder+'/':'images/'+ file,
      Key: this.FOLDER + file 
    },function (err,data){
      console.log('DD :',err);
    })
  }
  uploadCamera(imgBody,name,type,aws){
    console.log('DD :',imgBody);
    const bucket = new S3(
      {
        accessKeyId: aws.aws_key_id,
        secretAccessKey: aws.aws_key_secret,
        region: ''
      }
    );
    const params = {
      Bucket: aws.aws_bucket,
    //  Key: aws.aws_folder!=undefined || aws.aws_folder!=''?aws.aws_folder+'/':'images/'+ name,
      Key: this.FOLDER + name, 
      Body: imgBody,     
      ContentEncoding: 'base64',
      ContentType: 'image/'+type
    }; 
 
   
    bucket.upload(params,function (err, data) {
      if (err) {
       
   //   alert('There was an error uploading your file: '+ err);
        return false;
      }
    //   let toast = this.toastCtrl.create({
    //     message: 'Upload successfully',
    //     duration: 3000,
    //     position: 'top'
    //   });
    //  toast.present();
    
    // alert('Successfully uploaded file.');
      return true;
    });
  }

}
