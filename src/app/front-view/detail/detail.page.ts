import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
   data:any;
   title:string;
   author:string;

  constructor(
              private route:ActivatedRoute
             ) { }

  ngOnInit() {
    this.route.params.subscribe(res=>{   
     
      this.data = JSON.parse(res.item);
      });
      this.title = this.data.title;
      this.author = this.data.author;
    
  }

}
