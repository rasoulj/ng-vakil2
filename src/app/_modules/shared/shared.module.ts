import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './components/logout/logout.component';
import { PipesModule } from '../pipes/pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { ToolBarButtonComponent } from './components/tool-bar-button/tool-bar-button.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LogoutComponent,
    ToolBarComponent,
    ToolBarButtonComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [
    LogoutComponent,
    ToolBarComponent,
    ToolBarButtonComponent,
  ]
})
export class SharedModule { }
