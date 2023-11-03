import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MobileValidator } from '../_validators/mobile.validator';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onSubmit() {
    this.authService.createOtp(this.phone?.value ?? "").subscribe(
      value => this.router.navigate(['otp'])
    );
  }

  form = new FormGroup({
    phone: new FormControl('', [Validators.required, MobileValidator.mobileValidator]),
    //password: new FormControl('', [Validators.required]),
  })

  get phone() { return this.form.get('phone') }
  // get password() { return this.form.get('password') }
}
