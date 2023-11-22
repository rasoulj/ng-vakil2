import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { LegalRequestsComponent } from './legal-requests/legal-requests.component';
import { PendingPaymentsComponent } from './pending-payments/pending-payments.component';
import { MyCallsComponent } from './my-calls/my-calls.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { PipesModule } from '../pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { DialogModule } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
    LegalRequestsComponent,
    PendingPaymentsComponent,
    MyCallsComponent,
    ProfileHomeComponent,

  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,

    ProfileRoutingModule,

    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,

    CdkDropList, CdkDrag,

    PipesModule,
    SharedModule,

  ],
  exports: [
  ],

})
export class ProfileModule { }
