import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MyCallsComponent } from './my-calls/my-calls.component';
import { PendingPaymentsComponent } from './pending-payments/pending-payments.component';
import { LegalRequestsComponent } from './legal-requests/legal-requests.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { LogoutComponent } from '../shared/components/logout/logout.component';
import { FavoriteLawyersComponent } from '../shared/components/favorite-lawyers/favorite-lawyers.component';
import { MyQuestionsComponent } from '../shared/components/my-questions/my-questions.component';
import { ViewQuestionComponent } from '../shared/components/my-questions/view-question/view-question.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'profile-home', component: ProfileHomeComponent },
      { path: 'favorite-lawyers', component: FavoriteLawyersComponent },
      { path: 'legal-requests', component: LegalRequestsComponent },
      { path: 'pending-payments', component: PendingPaymentsComponent },
      { path: 'my-calls', component: MyCallsComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'my-questions', component: MyQuestionsComponent },
      { path: 'my-questions/:questionId', component: ViewQuestionComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
