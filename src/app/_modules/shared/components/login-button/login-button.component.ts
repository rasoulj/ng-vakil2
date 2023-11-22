import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { AuthService } from 'src/app/_modules/shared/services/auth.service';
import { getProfileLink } from '../../config/consts';
import { Dialog } from '@angular/cdk/dialog';
import { SignInModel } from '../../dialogs/signin/signin.model';
import { SigninDialog } from '../../dialogs/signin/signin.dialog';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: Dialog,

  ) { }


  get title(): string {
    return PersianPipe.toPersian(this.isLogged ? this.authService.displayName ?? "profile" : "login");
  }



  onClick() {
    if (!this.isLogged) {
      this.authService.ensureLogged();
    } else {
      this.router.navigate(getProfileLink(this.authService.role));
    }
  }

  get isLogged(): boolean {
    return this.authService.isLogged;
  }

  get isLawyer(): boolean {
    return this.authService.isLawyer;
  }

  get isManager(): boolean {
    return this.authService.isManager;
  }
}
