import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawyerComponent } from './lawyer.component';
import { LawyerHomeComponent } from './lawyer-home/lawyer-home.component';
import { FavoriteLawyersComponent } from '../shared/components/favorite-lawyers/favorite-lawyers.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { CalendarComponent } from '../shared/components/calendar/calendar.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { MyQuestionsComponent } from '../shared/components/my-questions/my-questions.component';
import { ViewQuestionComponent } from '../shared/components/my-questions/view-question/view-question.component';

const routes: Routes = [
  {
    path: '',
    component: LawyerComponent,
    children: [
      { path: 'favorite-lawyers', component: FavoriteLawyersComponent },
      { path: 'lawyer-home', component: LawyerHomeComponent },
      { path: 'scheduling', component: SchedulingComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'customers/:customerId', component: CustomerDetailComponent },
      { path: 'my-questions', component: MyQuestionsComponent },
      { path: 'my-questions/:questionId', component: ViewQuestionComponent },


    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawyerRoutingModule { }
