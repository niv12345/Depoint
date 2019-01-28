import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  data:any;
  itemData:any;
  htmlCode:any;
  constructor( private route:ActivatedRoute,
               private apiService:ApiService ) { }

  ngOnInit() {
    this.route.params.subscribe((res)=>{
       console.log('ITEM :',JSON.parse(res.item));
       this.data = JSON.parse(res.item);
    });
    this.apiService.GetActionList(this.data.applink).subscribe(res =>{
      this.itemData = res;
      this.htmlCode = this.itemData.data.fields.maincontent.fielddata;
  //    console.log('ITYEM :',this.itemData.data.fields.maincontent.fielddata);
     // console.log('ITYEM :',this.itemData.fields.maincontent);
    //  console.log('ionViewDidLoad ActionListPage',res);
    })
  }

}
