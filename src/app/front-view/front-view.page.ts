import { Router,  ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-front-view',
  templateUrl: './front-view.page.html',
  styleUrls: ['./front-view.page.scss'],
})
export class FrontViewPage implements OnInit {
  
  userData:any;

    vdata:any;
    searchData = [];
    itemArray = [];
    title = '';

    fabMenus;
    fabMenu_2;
    read;
    itemdata:any;
    startPage;
    pageLimit;
    totalRecords;
    showic= true;
    data:any;
    searchTxt = '';
    loader;
    showFilter = true;
    toggled = false;
    serachData:any;
    str = {read:'',fromdate:'',todate:''};
  constructor(private apiService:ApiService,
              private router:ActivatedRoute,
              private route:Router,
              private loadingCtrl:LoadingController) {  
                            this.showLoading();
                            this.router.params.subscribe(res=>{            
                            this.vdata = JSON.parse(res['viewData']);
                            });

                            if(this.vdata != undefined){
                              this.title = this.vdata.title ;
                            }
                            
                          if(this.searchData!=undefined){
                              this.showFilter = false;
                              if(this.searchData.length>0){
                              
                              for(let i=0; i<this.searchData.length; i++) {
                                this.itemArray.push(this.searchData[i]);
                            }
                            } 
                          }
                          this.init();  
               }

  ngOnInit() {
   
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',  
      cssClass:'txt'
    });
    return await loading.present();
  }

  onClkFunnel(){
   
    this.showic = false;
    this.str = {read:'',fromdate:'',todate:''};
  }
  onClkClose(){
   
    this.showic = true;
    this.str = {read:'',fromdate:'',todate:''};
  }
  searchItem(e){
  
    let val = e.target.value;
   
      if(val == 'read' || val == 'notread' || val =='all'){
      this.str.read = val;
    }else
    if(e.target.name == 'fromdate'){
      if(val != undefined){
        this.str.fromdate = val;
      }
     
    }else
    if(e.target.name == 'todate'){
      if(val != undefined){
        this.str.todate = val;
      }      
    }
   
     this.itemArray = [];
   
     this.apiService.GetMenuDataSearch(this.vdata.link,this.str).subscribe(res =>{
       if(res){
      this.serachData = res;    
      if(Object.keys(this.serachData.data).length>0){   
      for(let i=0;i<this.serachData.data.items.length;i++){
        this.itemArray.push(this.serachData.data.items[i]);
      }
     }
    }
   });
   
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
  
presentPopover(myEvent,item) {
  // let popover = this.popoverCtrl.create(MenuPopoverComponent,{'item':item});
  // popover.onDidDismiss(data=>{
 
  //   if(data){
  //     this.init();
  //   }
  // });
  // popover.present({
  //   ev: myEvent
  // });
}

init(){
  if(this.vdata!=undefined){
    this.apiService.GetMenuData(this.vdata.link).subscribe(res =>{
      if(res){
    
      this.itemArray = res.data.items;
      this.startPage = parseInt(res.data.start);
      this.pageLimit = parseInt(res.data.limit);
      this.totalRecords = parseInt(res.data.total);
      this.loadingCtrl.dismiss();
      }else{
        this.loadingCtrl.dismiss();
      }
     
    });
 
  }
}
public toggle(): void {
  this.toggled = !this.toggled;
}

onClickCard(item){

  if(item.isquestionarie == 1){
       this.route.navigate(['questionaire',{'item':JSON.stringify(item)}],{skipLocationChange:true});
  }else{
        this.route.navigate(['detail',{'item':JSON.stringify(item)}],{skipLocationChange:true});
 }

}

getItems(ev: any) {
       
  const val = ev.target.value;
  // if(val.length>4){
    this.apiService.SearchItem(val).subscribe(res =>{
  if(Object.keys(res).length>0){
  if(res.data.items.length>0){
 //   this.navCtrl.push('frontview',{search:res.data.items});
    this.searchTxt = '';
    this.toggled = false;
  }
}else{
  
}
});

}
cancelSearch(e){
this.searchTxt = '';
}

}
