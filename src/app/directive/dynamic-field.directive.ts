import { FileuploadComponent } from './../component/fileupload/fileupload.component';
import { Directive, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FieldConfig } from '../modal/field.interface';
import { FormGroup } from '@angular/forms';
import { InputComponent } from '../component/input/input.component';
import { ButtonComponent } from '../component/button/button.component';
import { SelectComponent } from '../component/select/select.component';
import { DateComponent } from '../component/date/date.component';
import { RadiobuttonComponent } from '../component/radiobutton/radiobutton.component';
import { CheckboxComponent } from '../component/checkbox/checkbox.component';
import { SignatureComponent } from '../component/signature/signature.component';


const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  signature:SignatureComponent,
  fileupload:FileuploadComponent
};
@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit{

  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

}
