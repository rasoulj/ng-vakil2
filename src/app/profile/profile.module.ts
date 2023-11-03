import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FavoriteLawyersComponent } from './favorite-lawyers/favorite-lawyers.component';
import { LegalRequestsComponent } from './legal-requests/legal-requests.component';
import { PendingPaymentsComponent } from './pending-payments/pending-payments.component';
import { MyCallsComponent } from './my-calls/my-calls.component';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { PipesModule } from '../_pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { ToolBarButtonComponent } from './tool-bar-button/tool-bar-button.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { NoDataComponent } from './no-data/no-data.component';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { DialogModule } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ProfileComponent,
    FavoriteLawyersComponent,
    LegalRequestsComponent,
    PendingPaymentsComponent,
    MyCallsComponent,
    MyQuestionsComponent,
    ProfileHomeComponent,
    ToolBarComponent,
    ToolBarButtonComponent,
    LogoutComponent,
    ErrorMessageComponent,
    NoDataComponent,

  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatCardModule,

    ProfileRoutingModule,

    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,

    CdkDropList, CdkDrag,

    PipesModule,

  ],
  exports: [
    ToolBarButtonComponent,
  ],

})
export class ProfileModule { }
