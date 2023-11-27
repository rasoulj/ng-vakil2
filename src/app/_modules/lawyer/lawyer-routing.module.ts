import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawyerComponent } from './lawyer.component';
import { LawyerHomeComponent } from './lawyer-home/lawyer-home.component';
import { FavoriteLawyersComponent } from '../shared/components/favorite-lawyers/favorite-lawyers.component';
import { SchedulingComponent } from './scheduling/scheduling.component';

const routes: Routes = [
  {
    path: '',
    component: LawyerComponent,
    children: [
      { path: 'favorite-lawyers', component: FavoriteLawyersComponent },
      { path: 'lawyer-home', component: LawyerHomeComponent },
      { path: 'scheduling', component: SchedulingComponent },
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawyerRoutingModule { }
