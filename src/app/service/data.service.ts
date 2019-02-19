import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  private userData:string;
  // = new BehaviorSubject<string[]>([]);

  constructor() { 
 
  }
   
  getData(){
  return this.userData;
  }
  setData(value){
    this.userData =  value;
  }
  // get data():Object{
  //     return this.userData;
  // }
  // set data(value:string){
  //   this.userData = value;

  // }
}
