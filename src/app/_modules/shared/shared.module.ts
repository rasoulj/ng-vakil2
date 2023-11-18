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
import { LawyerOnlineViewComponent } from './components/lawyer-online-view/lawyer-online-view.component';
import { LawyerViewComponent } from './components/lawyer-view/lawyer-view.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    LogoutComponent,
    ToolBarComponent,
    ToolBarButtonComponent,
    AvatarComponent,
    ErrorMessageComponent,
    NoDataComponent,
    LawyerOnlineViewComponent,
    LawyerViewComponent,

  ],
  imports: [
    CommonModule,
    PipesModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatMenuModule,

  ],
  exports: [
    LogoutComponent,
    ToolBarComponent,
    ToolBarButtonComponent,
    AvatarComponent,
    ErrorMessageComponent,
    NoDataComponent,
    LawyerOnlineViewComponent,
    LawyerViewComponent,

  ]
})
export class SharedModule { }
