import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawyerComponent } from './lawyer.component';
import { LogoutComponent } from '../shared/components/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: LawyerComponent,
    children: [
      { path: 'logout', component: LogoutComponent },
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawyerRoutingModule { }
