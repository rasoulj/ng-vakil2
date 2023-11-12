import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { InitLawyersComponent } from './init-lawyers/init-lawyers.component';
import { SharedModule } from '../shared/shared.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { RegisteredLawyersComponent } from './registered-lawyers/registered-lawyers.component';
import { LawyerViewComponent } from './_components/lawyer-view/lawyer-view.component';
import { ManagerService } from './_services/manager.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { PersianPipe } from '../pipes/persian.pipe';
import { PipesModule } from '../pipes/pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    ManagerComponent,
    InitLawyersComponent,
    ManagerHomeComponent,
    RegisteredLawyersComponent,
    LawyerViewComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,

    PipesModule,
    SharedModule,
  ],
  providers: [
    ManagerService,
  ]
})
export class ManagerModule { }
