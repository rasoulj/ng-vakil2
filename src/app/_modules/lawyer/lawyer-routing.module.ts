import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawyerComponent } from './lawyer.component';
import { LogoutComponent } from '../shared/components/logout/logout.component';
import { LawyerHomeComponent } from './lawyer-home/lawyer-home.component';

const routes: Routes = [
  {
    path: '',
    component: LawyerComponent,
    children: [
      { path: 'lawyer-home', component: LawyerHomeComponent },
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawyerRoutingModule { }
