import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawyerRoutingModule } from './lawyer-routing.module';
import { LawyerComponent } from './lawyer.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LawyerComponent
  ],
  imports: [
    CommonModule,
    LawyerRoutingModule,
    SharedModule,
  ]
})
export class LawyerModule { }
