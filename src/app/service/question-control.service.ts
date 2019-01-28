import { Injectable } from '@angular/core';
import { QuestionBase } from '../modal/question-base';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};
   if(questions != undefined){
    questions.forEach(question => {
      group[question.id] =  new FormControl(question.value || '');
                                            
    });
    return new FormGroup(group);
  }
}

}
