import { environment as ENV } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const auth = localStorage.getItem('AUTH_KEY');

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   auth: string;
   BASE_URL:string;
  constructor(public http: HttpClient){
    this.BASE_URL = localStorage.getItem('BASE_URL');
   console.log("BU :",localStorage.getItem('BASE_URL'));
    
  }
  ngOnInit(): void {
    this.BASE_URL = localStorage.getItem('BASE_URL');
    console.log('URL 1 :',this.BASE_URL);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.auth = localStorage.getItem('AUTH_KEY');
  }
  GetLang(url): Observable<any>{
   // this.BASE_URL = url;
   // localStorage.setItem('BASE_URL',url);
    this.BASE_URL = localStorage.getItem('BASE_URL');
    return this.http.get(url + '/ws/v1/lang').pipe();
      
  }
  SetUserLogin(data,uid):  Observable<any>{
 
    
    let body = new FormData();
    body.append('username',data.value.username);
    body.append('password',data.value.password);  
   body.append('deviceid',uid);   
    //console.log('UUUU :'+JSON.stringify(body));
 
    return this.http.post(this.BASE_URL + '/ws/v1/users/login',body).pipe();
  
    
  }
  GetFabMenu(): Observable<any>{
  console.log('URL :',this.BASE_URL);
    
  return this.http.get(this.BASE_URL + '/ws/v1/menus?key='+localStorage.getItem('AUTH_KEY'));
  }
  GetFabFormData(appenUrl): Observable<any>{
  
    return this.http.get(this.BASE_URL + '/' + appenUrl + '&key='+localStorage.getItem('AUTH_KEY'));
  }
  PostQuestion(qsttitle,data,type_id): Observable<any>{
    let body = new FormData();
    console.log('AAA :',qsttitle);
    body.append(qsttitle,JSON.stringify(data));  
 
    
    body.append('type_id',type_id);
  //  console.log('BODY',JSON.stringify(body));
    
    return this.http.post(this.BASE_URL + '/ws/v1/items/items?key=' + localStorage.getItem('AUTH_KEY'),body);
  }
  PostQuiz(qst,data): Observable<any>{
     let body = new FormData();
     let itemid = qst.itemid;
     let typeid = qst.typeid;
     let questionid = qst.questionid;
     let catid = qst.catid;
    console.log('MY CAT :',JSON.stringify(data));
     body.append('item_id',JSON.stringify(itemid));
     body.append('type_id',JSON.stringify(typeid));
     body.append('questionnaire_id',JSON.stringify(questionid));
     body.append('answer_data',JSON.stringify(data));
     body.append('catid',JSON.stringify(catid));
   
    // let key = Object.keys(data);
   console.log('POST QUIZ :',JSON.stringify(body));
    return this.http.post(this.BASE_URL + '/ws/v1/items/items?key=' + localStorage.getItem('AUTH_KEY'),body);
    // let tArray = [];
    // key.forEach(element => {
    //   body.append(qsttitle+'[]',element+','+data[element]);
    //   body.append('fieldsValue[]',data[element]);
    // });
    
    
    // body.append('type_id',type_id);
    // console.log('BODY',JSON.stringify(body));
    
   
   // return data;
  }
  GetMenuData(appenUrl): Observable<any>{
   
 //   console.log('MENU_URL :',this.localStorage.getItem('AUTH_KEY'));
  return this.http.get(this.BASE_URL + '/' + appenUrl + '?key='+ localStorage.getItem('AUTH_KEY'));
  //  return this.http.get(this.BASE_URL + '/ws/v1/items/category/49?key='+this.localStorage.getItem('AUTH_KEY'));
  }
  GetMenuDatapagination(appenUrl,start){
   
    return this.http.get(this.BASE_URL + '/' + appenUrl + '?key='+localStorage.getItem('AUTH_KEY')+'&start='+start);    
  }
  GetMenuDataSearch(appenUrl,arg){

    if(arg){
      return this.http.get(this.BASE_URL + '/' + appenUrl + '?key='+localStorage.getItem('AUTH_KEY')+'&read='+arg.read+'&fromdate='+arg.fromdate+'&todate='+ arg.todate);
    }
   
  }
  DeleteArchive(id){
    return this.http.delete(this.BASE_URL + '/ws/v1/items/items?key='+localStorage.getItem('AUTH_KEY')+'&id='+id);
  }

  SearchItem(SearchItem):Observable<any>{
    return this.http.get(this.BASE_URL + '/ws/v1/items?key='+localStorage.getItem('AUTH_KEY')+'&filter='+SearchItem);
  }
  GetTicketList(linkURL):Observable<any>{
  //  console.log('LINK URL:',linkURL);
    return this.http.get(this.BASE_URL + '/'+linkURL + '&key=' + localStorage.getItem('AUTH_KEY'));
  }
  GetTicketDataSearch(linkURL,arg){

    if(arg){
      return this.http.get(this.BASE_URL + '/'+linkURL+'&key='+localStorage.getItem('AUTH_KEY')+'&read='+arg.read+'&fromdate='+arg.fromdate+'&todate='+ arg.todate);
    }
   
  }
  GetTicketDatapagination(appenUrl,start){
   
    return this.http.get(this.BASE_URL + '/'+appenUrl+'&key='+localStorage.getItem('AUTH_KEY')+'&start='+start);    
  }

  GetActionList(linkURL):Observable<any>{
  //  console.log('LINK URL:',linkURL);
    return this.http.get(this.BASE_URL + '/'+linkURL + '?key=' +localStorage.getItem('AUTH_KEY'));
  }

  getClientList():Observable<any>{
    return this.http.get('https://castro.depoint.app/ws/v1/lang/customers');
  }
}
