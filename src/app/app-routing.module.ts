import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawTablesComponent } from './law-tables/law-tables.component';
import { CallLawyerComponent } from './lawyers-view/call-lawyer/call-lawyer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_modules/shared/services/auth.service';
import { LawyerRegisterComponent } from './lawyer-register/lawyer-register.component';
import { CheckOtpComponent } from './check-otp/check-otp.component';
import { VerifyComponent } from './lawyer-register/verify/verify.component';
import { ConfirmComponent } from './lawyer-register/confirm/confirm.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { SearchLawyersComponent } from './lawyers-view/search-lawyers/search-lawyers.component';
import { FavoriteLawyersComponent } from './_modules/shared/components/favorite-lawyers/favorite-lawyers.component';
import { ViewLawyerComponent } from './view-lawyer/view-lawyer.component';
import { QuestionComponent } from './view-lawyer/question/question.component';
import { CallComponent } from './view-lawyer/call/call.component';
import { MyQuestionsComponent } from './_modules/shared/components/my-questions/my-questions.component';
import { ViewQuestionComponent } from './_modules/shared/components/my-questions/view-question/view-question.component';

const isLogged: () => boolean = () => inject(AuthService).isLogged;
const isCustomer = () => inject(AuthService).isCustomer;
const isLawyer = () => inject(AuthService).isLawyer;

//Salaam test for branching, continue
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "law-tables", component: LawTablesComponent },
  { path: "call-lawyer", component: CallLawyerComponent },
  { path: "search-lawyer", component: SearchLawyersComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "favorite-lawyers", canActivate: [isLogged], component: FavoriteLawyersComponent },
  { path: "lawyer-register", component: LawyerRegisterComponent },
  { path: "lawyer-register/verify", component: VerifyComponent },
  { path: "lawyer-register/verify/:code", component: ConfirmComponent },
  { path: "otp", component: CheckOtpComponent },

  { path: "upload-avatar", canActivate: [isLogged], component: UploadAvatarComponent },
  { path: "view-lawyer/:id", component: ViewLawyerComponent },
  { path: "view-lawyer/:id/question", component: QuestionComponent },
  { path: "view-lawyer/:id/call", component: CallComponent },

  { path: 'my-questions', component: MyQuestionsComponent },
  { path: 'my-questions/:questionId', component: ViewQuestionComponent },


  {
    path: 'profile',
    canActivate: [isLogged],
    loadChildren: () => import('./_modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'lawyer',
    canActivate: [isLogged],
    loadChildren: () => import('./_modules/lawyer/lawyer.module').then(m => m.LawyerModule)
  },
  {
    path: 'manager',
    canActivate: [isLogged],
    loadChildren: () => import('./_modules/manager/manager.module').then(m => m.ManagerModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
