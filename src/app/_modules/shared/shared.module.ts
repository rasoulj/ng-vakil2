import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './components/logout/logout.component';
import { PipesModule } from '../pipes/pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { ToolBarButtonComponent } from './components/tool-bar-button/tool-bar-button.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from './components/avatar/avatar.component';
import { MatCardModule } from '@angular/material/card';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { NoDataComponent } from './components/no-data/no-data.component';



@NgModule({
  declarations: [
    LogoutComponent,
    ToolBarComponent,
    ToolBarButtonComponent,
    AvatarComponent,
    ErrorMessageComponent,
    NoDataComponent,

  ],
  imports: [
    CommonModule,
    PipesModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,

  ],
  exports: [
    LogoutComponent,
    ToolBarComponent,
    ToolBarButtonComponent,
    AvatarComponent,
    ErrorMessageComponent,
    NoDataComponent,
  ]
})
export class SharedModule { }
