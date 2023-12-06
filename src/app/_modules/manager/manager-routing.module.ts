import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { InitLawyersComponent } from './init-lawyers/init-lawyers.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { RegisteredLawyersComponent } from './registered-lawyers/registered-lawyers.component';
import { FavoriteLawyersComponent } from '../shared/components/favorite-lawyers/favorite-lawyers.component';
import { MyQuestionsComponent } from '../shared/components/my-questions/my-questions.component';
import { CalendarComponent } from '../shared/components/calendar/calendar.component';
import { ViewQuestionComponent } from '../shared/components/my-questions/view-question/view-question.component';

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
      { path: 'calendar', component: CalendarComponent },
      { path: 'my-questions', component: MyQuestionsComponent },
      { path: 'my-questions/:questionId', component: ViewQuestionComponent },

    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
