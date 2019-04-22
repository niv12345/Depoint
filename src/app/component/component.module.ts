
import { MaterialModule } from './../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { SelectComponent } from './select/select.component';
import { DateComponent } from './date/date.component';
import { RadiobuttonComponent } from './radiobutton/radiobutton.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SignatureComponent } from './signature/signature.component';
import { FileuploadComponent } from './fileupload/fileupload.component';

import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionFormFieldComponent } from './question-form-field/question-form-field.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EditorComponent } from './editor/editor.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { InputItemComponent } from './input-item/input-item.component';
import { InputItemsFieldComponent } from './input-items-field/input-items-field.component';
import { DragulaService } from 'ng2-dragula';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent,
    DynamicFormComponent, 
    InputComponent, 
    ButtonComponent, 
    SelectComponent, 
    DateComponent, 
    RadiobuttonComponent, 
    CheckboxComponent, 
    SignatureComponent, 
    FileuploadComponent,
  
    DynamicFormFieldComponent,
    QuestionFormComponent,
    QuestionFormFieldComponent,
    EditorComponent,
    DropdownComponent,
    InputItemComponent,
    InputItemsFieldComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SignaturePadModule

 
 
  ],
  exports:[
    HeaderComponent, 
    FooterComponent,
    DynamicFormComponent, 
    InputComponent, 
    ButtonComponent, 
    SelectComponent, 
    DateComponent, 
    RadiobuttonComponent, 
    CheckboxComponent, 
    SignatureComponent, 
    FileuploadComponent,
 
    QuestionFormComponent,
    QuestionFormFieldComponent,
    EditorComponent,
    DropdownComponent,
    InputItemComponent,
    InputItemsFieldComponent,
   

  ],
  entryComponents:[
    HeaderComponent, 
    FooterComponent,
    DynamicFormComponent, 
    InputComponent, 
    ButtonComponent, 
    SelectComponent, 
    DateComponent, 
    RadiobuttonComponent, 
    CheckboxComponent, 
    SignatureComponent, 
    FileuploadComponent,
    QuestionFormComponent,
    QuestionFormFieldComponent,
    EditorComponent,
    DropdownComponent,
    InputItemComponent,
    InputItemsFieldComponent,


  ],
  providers:[
    Camera,DragulaService
  ]
})
export class ComponentModule { }
