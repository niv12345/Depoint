import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
   data;
   actionArray;
  constructor(private route:Router) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('USER'));
  this.actionArray = this.data.data.immidiate_action;
  }
  onClkCard(item){
   this.route.navigate(['/detail-page',{item:JSON.stringify(item)}],{skipLocationChange: true});
  }

}
