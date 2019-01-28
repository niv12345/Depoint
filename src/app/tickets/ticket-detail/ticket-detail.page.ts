import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {
  data;
  constructor(private route:ActivatedRoute) { 
    this.route.params.subscribe(res =>{
     this.data = JSON.parse(res.item);
    })
  }

  ngOnInit() {
  }

}
