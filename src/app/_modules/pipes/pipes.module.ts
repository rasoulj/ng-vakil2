import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersianPipe } from './persian.pipe';



@NgModule({
  declarations: [
    PersianPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PersianPipe
  ]
})
export class PipesModule { }
