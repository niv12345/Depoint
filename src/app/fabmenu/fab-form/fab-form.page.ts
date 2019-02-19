import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormComponent } from 'src/app/component/dynamic-form/dynamic-form.component';
import { FieldConfig } from 'src/app/modal/field.interface';

@Component({
  selector: 'app-fab-form',
  templateUrl: './fab-form.page.html',
  styleUrls: ['./fab-form.page.scss']
})
export class FabFormPage implements OnInit {
  formdata;
  itemtitle;
  typeid;
  key;
  qstData = [];
 // regConfig: FieldConfig[] = [];
  constructor(private route: ActivatedRoute) { 
    let a = this.route.params.subscribe(res =>{
      
      this.formdata = JSON.parse(res.formdata);
      this.itemtitle = JSON.parse(res.itemtitle);
      this.typeid = JSON.parse(res.typeid);
      this.key = JSON.parse(res.key);
      console.log('RESS :',this.formdata );
    });
   
  }

  ngOnInit() {
    this.formdata.forEach(element =>{
      if(element.status == 1){
        this.qstData.push(element);
   
      }
    });  
   
  }
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[];// = [
  //  {
      // type: "input",
      // label: this.qstData[0].qntlabel,
      // inputType: this.qstData[0].qntname,
      // name: "name",
      // validations: [
      //   {
      //     name: "required",
      //     validator: Validators.required,
      //     message: "Name Required"
      //   },
      //   {
      //     name: "pattern",
      //     validator: Validators.pattern("^[a-zA-Z]+$"),
      //     message: "Accept only text"
      //   }
      // ]
 //   }]
  //,
  //   {
  //     type: "input",
  //     label: "Email Address",
  //     inputType: "email",
  //     name: "email",
  //     validations: [
  //       {
  //         name: "required",
  //         validator: Validators.required,
  //         message: "Email Required"
  //       },
  //       {
  //         name: "pattern",
  //         validator: Validators.pattern(
  //           "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
  //         ),
  //         message: "Invalid email"
  //       }
  //     ]
  //   },
  //   {
  //     type: "input",
  //     label: "Password",
  //     inputType: "password",
  //     name: "password",
  //     validations: [
  //       {
  //         name: "required",
  //         validator: Validators.required,
  //         message: "Password Required"
  //       }
  //     ]
  //   },
  //   {
  //     type: "radiobutton",
  //     label: "Gender",
  //     name: "gender",
  //     options: ["Male", "Female"],
  //     value: "Male"
  //   },
  //   {
  //     type: "date",
  //     label: "DOB",
  //     name: "dob",
  //     validations: [
  //       {
  //         name: "required",
  //         validator: Validators.required,
  //         message: "Date of Birth Required"
  //       }
  //     ]
  //   },
  //   {
  //     type: "select",
  //     label: "Country",
  //     name: "country",
  //     value: "UK",
  //     options: ["India", "UAE", "UK", "US"]
  //   },
  //   {
  //     type: "checkbox",
  //     label: "Accept Terms",
  //     name: "term",
  //     value: true
  //   },
  //   {
  //     type: "button",
  //     label: "Save"
  //   }
  // ];

  submit(value: any) {}
}
