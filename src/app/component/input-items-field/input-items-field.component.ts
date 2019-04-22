import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-input-items-field',
  templateUrl: './input-items-field.component.html',
  styleUrls: ['./input-items-field.component.scss']
})
export class InputItemsFieldComponent implements OnInit {
  @Input() fieldtype;
  @Input() form:FormGroup;
  rowArray = [0];
  constructor(private  fb:FormBuilder) {
    console.log('FT ',this.fieldtype);
   }

  ngOnInit() {
      this.form = new FormGroup({});
    console.log('FT 1',this.fieldtype);
  }
  onClickAdd(){
    this.rowArray.push(1);

  }
  onClickTrash(i){
  //  const ind = this.rowArray.indexOf(i);
  if(this.rowArray.length>1){
  this.rowArray.splice(i,1);
  }
  }
  onRenderItems(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
   //  let draggedItem = this.fieldtype.splice(event.detail.from,1)[0];
 //    this.fieldtype.splice(event.detail.to,0,draggedItem)
    //this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    event.detail.complete();
  }
}
