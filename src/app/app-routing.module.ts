import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawTablesComponent } from './law-tables/law-tables.component';
import { CallLawyerComponent } from './call-lawyer/call-lawyer.component';
import { TextLawyerComponent } from './text-lawyer/text-lawyer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_modules/shared/services/auth.service';
import { LawyerRegisterComponent } from './lawyer-register/lawyer-register.component';
import { CheckOtpComponent } from './check-otp/check-otp.component';
import { VerifyComponent } from './lawyer-register/verify/verify.component';
import { ConfirmComponent } from './lawyer-register/confirm/confirm.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { SearchLawyersComponent } from './search-lawyers/search-lawyers.component';

const isLogged: () => boolean = () => inject(AuthService).isLogged;
const isCustomer = () => inject(AuthService).isCustomer;
const isLawyer = () => inject(AuthService).isLawyer;

//Salaam test for branching, continue
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "law-tables", component: LawTablesComponent },
  { path: "call-lawyer", component: CallLawyerComponent },
  { path: "text-lawyer", component: TextLawyerComponent },
  { path: "search-lawyer", component: SearchLawyersComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "lawyer-register", component: LawyerRegisterComponent },
  { path: "lawyer-register/verify", component: VerifyComponent },
  { path: "lawyer-register/verify/:code", component: ConfirmComponent },
  { path: "otp", component: CheckOtpComponent },

  { path: "upload-avatar", canActivate: [isLogged], component: UploadAvatarComponent },

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
