import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-type-list',
  templateUrl: './ticket-type-list.page.html',
  styleUrls: ['./ticket-type-list.page.scss'],
})
export class TicketTypeListPage implements OnInit {
 
 
  read;
  itemdata:any;
  startPage;
  pageLimit;
  totalRecords;
  showic= true;
  data:any;
  searchTxt = '';
  loader;
  showFilter= true;
  toggled = false;
  serachData:any;
  str = {read:'',fromdate:'',todate:''};
  vdata:any;
  itemArray: any;

  constructor(private apiService:ApiService,
              private route:ActivatedRoute,
              private router:Router) { 
                this.route.params.subscribe(res =>{
                  this.vdata = JSON.parse(res.item);
                });

                console.log('III ',this.vdata);
  }

  ngOnInit() {
    if(this.vdata!=undefined){
      this.apiService.GetTicketList(this.vdata.link).subscribe(res =>{
       
        this.itemArray = res.data.items;
        this.startPage = parseInt(res.data.start);
        this.pageLimit = parseInt(res.data.limit);
        this.totalRecords = parseInt(res.data.total);
      
      });
   
    }
   
  }
  doInfinite(event) {  

  setTimeout(() => {
    console.log('Done');
    event.target.complete();
    this.startPage = parseInt(this.startPage) + parseInt(this.pageLimit) ;
    if(this.totalRecords >= this.startPage ){    

      this.apiService.GetMenuDatapagination(this.vdata.link,this.startPage)
         .subscribe(res => {
            if(res){
              this.itemdata = res;         
              if(Object.keys(this.itemdata).length>0 && Object.keys(this.itemdata.data).length>0){
                this.data = this.itemdata.data;
              this.startPage = this.data.start;
              this.pageLimit = this.data.limit;               
              this.totalRecords = this.data.total;               
             for(let i=0; i<this.data.items.length; i++) {
               this.itemArray.push(this.data.items[i]);
            }
          }
          }
           },
          error => { console.log(error);});
          }
    
    if(this.data&&this.data.items){
    if (this.data.items.length == 1000) {
      event.target.disabled = true;
    }
  }
  }, 500);
  }
  getItems(ev: any) {
     
    const val = ev.target.value;
    // if(val.length>4){
    this.apiService.SearchItem(val).subscribe(res =>{
    //console.log(res);
    if(res.data.items.length>0){
   //   this.navCtrl.push('frontview',{search:res.data.items});
      this.searchTxt = '';
      this.toggled = false;
    }
    });
    //  }
    // if (val && val.trim() != '') {
    //   this.items = this.items.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
    }
    searchItem(e){
      let val = e.target.value;
      
     
      if(val == 'read' || val == 'notread' || val =='all'){
        this.str.read = val;
      }else
      if(e.target.name == 'fromdate'){
        if(val != undefined){
          this.str.fromdate = val;
        }else{
        
        }
       
      }else
      if(e.target.name == 'todate'){
        if(val != undefined){
          this.str.todate = val;
        }
        
      }
     
       this.itemArray = [];
     //  this.showLoader();
       this.apiService.GetTicketDataSearch(this.vdata.link,this.str).subscribe(res =>{
        
        this.serachData = res;
       // this.hideLoader();
       if(this.serachData.data.items){
        for(let i=0;i<this.serachData.data.items.length;i++){
          this.itemArray.push(this.serachData.data.items[i]);
        }
      }
        
      });
     
    }
    onClkFunnel(){
      this.showic = false;
      this.str = {read:'',fromdate:'',todate:''};
    }
    onClkClose(){
      this.showic = true;
      this.str = {read:'',fromdate:'',todate:''};
    }
    onClickCard(item){
      this.router.navigate(['/ticket-desc',{item:JSON.stringify(item)}],{skipLocationChange:true});

    }
}
