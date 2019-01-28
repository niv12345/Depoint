import { ApiService } from 'src/app/service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.page.html',
  styleUrls: ['./ticket-list.page.scss'],
})
export class TicketListPage implements OnInit {
  data:any;  
  ticketArray = [];
  constructor(private apiService:ApiService,
              private router:Router) { 
    this.data = JSON.parse(localStorage.getItem('USER'));
    this.ticketArray = this.data.data.open_action;
  }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('USER'));
    this.ticketArray = this.data.data.open_action;
  }
  openLink(item){
    console.log('I :',item.title);
 this.router.navigate(['/ticket-list',{item:JSON.stringify(item)}],{skipLocationChange: true});

  }
}
