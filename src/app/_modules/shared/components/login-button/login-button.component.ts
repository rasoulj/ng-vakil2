import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { AuthService } from 'src/app/_modules/shared/services/auth.service';
import { getProfileLink } from '../../config/consts';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }


  get title(): string {
    return PersianPipe.toPersian(this.isLogged ? "profile" : "login");
  }

  onClick() {
    this.router.navigate(getProfileLink(this.authService.role));
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
