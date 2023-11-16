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

  openSignInDialog(data: SignInModel): void {
    const dialogRef = this.dialog.open<SignInModel>(SigninDialog, {
      width: '450px',
      data: data,
    });

    dialogRef.closed.subscribe((value) => {
      if (value?.registerAsLawyer) {
        this.router.navigate(['/lawyer-register']);
      }
    });
  }

  onClick() {
    if (!this.isLogged) {
      this.openSignInDialog({ registerAsLawyer: false });
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
