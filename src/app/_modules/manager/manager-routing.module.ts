import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { InitLawyersComponent } from './init-lawyers/init-lawyers.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { RegisteredLawyersComponent } from './registered-lawyers/registered-lawyers.component';
import { FavoriteLawyersComponent } from '../shared/components/favorite-lawyers/favorite-lawyers.component';
import { MyQuestionsComponent } from '../shared/components/my-questions/my-questions.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      { path: 'manager-home', component: ManagerHomeComponent },
      { path: 'registered-lawyers', component: RegisteredLawyersComponent },
      { path: 'init-lawyers', component: InitLawyersComponent },
      { path: 'favorite-lawyers', component: FavoriteLawyersComponent },
      { path: 'my-questions', component: MyQuestionsComponent },

    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
