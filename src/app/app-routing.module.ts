import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawTablesComponent } from './law-tables/law-tables.component';
import { CallLawyerComponent } from './call-lawyer/call-lawyer.component';
import { TextLawyerComponent } from './text-lawyer/text-lawyer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
import { LawyerRegisterComponent } from './lawyer-register/lawyer-register.component';
import { CheckOtpComponent } from './check-otp/check-otp.component';

const canActivate = () => inject(AuthService).isLogged;

//Salaam test for branching, continue
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "law-tables", component: LawTablesComponent },
  { path: "call-lawyer", component: CallLawyerComponent },
  { path: "text-lawyer", component: TextLawyerComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "lawyer-register", component: LawyerRegisterComponent },
  { path: "otp", component: CheckOtpComponent },

  {
    path: 'profile',
    canActivate: [canActivate],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
