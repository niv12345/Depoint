import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
    data:any;
    data2 =[];
    selectedVal = [];
    selVal;
  constructor(private navParam:NavParams,
              private popCtrl:PopoverController) { 
    this.data = this.navParam.get('data');
    // console.log('DAAD :',this.data[0].label);
  }

  ngOnInit() {
  }
  onClick(){
   this.popCtrl.dismiss(this.selVal);
  }
  chkValue(val){
   this.selVal = val.detail.value;
 //  this.selectedVal.push(val.detail.value);
   console.log(this.selVal);
  }
}
