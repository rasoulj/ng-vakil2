import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawTablesComponent } from './law-tables/law-tables.component';
import { CallLawyerComponent } from './call-lawyer/call-lawyer.component';
import { TextLawyerComponent } from './text-lawyer/text-lawyer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

const canActivate = () => inject(AuthService).isLogged;

//Salaam test for branching
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "law-tables", component: LawTablesComponent },
  { path: "call-lawyer", component: CallLawyerComponent },
  { path: "text-lawyer", component: TextLawyerComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },

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
