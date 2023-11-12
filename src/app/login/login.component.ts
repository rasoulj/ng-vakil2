import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MobileValidator } from '../_modules/shared/validators/mobile.validator';
import { AuthService } from '../_modules/shared/services/auth.service';
import { Router } from '@angular/router';
import { PersianPipe } from '../_modules/pipes/persian.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snack: MatSnackBar,

  ) { }

  onSubmit() {
    this.authService.createOtp(this.phone?.value ?? "").subscribe({
      next: value => this.router.navigate(['otp']),
      error: (err) => {
        console.log(err);
        this.snack.open(err.message, PersianPipe.toPersian("ok"), {
          duration: 3000,
          panelClass: "success-snackbar",
        });

      },
    });
  }

  form = new FormGroup({
    phone: new FormControl('09133834091', [Validators.required, MobileValidator.mobileValidator]),
    //password: new FormControl('', [Validators.required]),
  })

  get phone() { return this.form.get('phone') }
  // get password() { return this.form.get('password') }
}
