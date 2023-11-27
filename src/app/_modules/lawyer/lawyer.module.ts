import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawyerRoutingModule } from './lawyer-routing.module';
import { LawyerComponent } from './lawyer.component';
import { SharedModule } from '../shared/shared.module';
import { LawyerHomeComponent } from './lawyer-home/lawyer-home.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { PipesModule } from '../pipes/pipes.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LawyerComponent,
    LawyerHomeComponent,
    SchedulingComponent
  ],
  imports: [
    CommonModule,
    LawyerRoutingModule,
    SharedModule,
    PipesModule,
    MatCheckboxModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class LawyerModule { }
