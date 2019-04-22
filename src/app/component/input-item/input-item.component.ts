import { Component, OnInit, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { FormGroup } from '@angular/forms';

let personId = 0;

class Person {
  id: number;
  constructor(public name: string) {
    this.id = personId++;
  }
}
class Inputdata{
  type:string;
  label:string;
  multichoice:boolean;
  required:boolean;
  filtering:boolean;
}

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.scss']
})
export class InputItemComponent implements OnInit {
  @Input() item = [];
  form: FormGroup;
  data;
  constructor(private dragulaService: DragulaService) {
 //   dragulaService.createGroup('PERSON',{});

   console.log('CITEM ',this.item);
  }

  ngOnInit() {
    this.data = this.item;
    console.log('CITEM 1',this.item);
  }
  onClickDel(ind){
   
    let tempArray =[] = this.item;
  
   // const ind: number = this.item.indexOf(data.label);
    console.log('DEL ',ind);
    //if(ind == -1){
      this.item.splice(ind,1);
      console.log('DAAAADd',this.item);
  //  }
     //  this.dragulaService.remove('PERSON');
  }
  onRenderItems(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
     let draggedItem = this.item.splice(event.detail.from,1)[0];
     this.item.splice(event.detail.to,0,draggedItem)
    //this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    event.detail.complete();
  }
  rec(event){
console.log('EV');
  }
}
