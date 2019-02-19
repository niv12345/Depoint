import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
   data:any;
   title:string;
   author:string;
   sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
 //  @ViewChild('slides') slides;
  constructor(
              private route:ActivatedRoute,
              private loadingCtrl:LoadingController
             ) { }

  ngOnInit() {
   this.showLoading();
    this.route.params.subscribe(res=>{   
     
      this.data = JSON.parse(res.item);
      });
      console.log('DETAIL :',this.data);
      this.title = this.data.title;
      this.author = this.data.author;
      setTimeout(()=>{
        this.loadingCtrl.dismiss();
      },2000);
    
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',  
      cssClass:'txt'
    });
    return await loading.present();
  }

  preSlides(){
   // this.slides.slidePrev();
  }
  nextSlides(){
//    this.slides.slideNext();
  }
}
