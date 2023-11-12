import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { FavoriteLawyersComponent } from './favorite-lawyers/favorite-lawyers.component';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { MyCallsComponent } from './my-calls/my-calls.component';
import { PendingPaymentsComponent } from './pending-payments/pending-payments.component';
import { LegalRequestsComponent } from './legal-requests/legal-requests.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { LogoutComponent } from '../shared/components/logout/logout.component';

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
      { path: 'my-questions', component: MyQuestionsComponent },
      { path: 'logout', component: LogoutComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
