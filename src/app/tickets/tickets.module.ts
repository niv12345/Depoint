import { ComponentModule } from './../component/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    ComponentModule
  ]
})
export class TicketsModule { }
