import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, take } from 'rxjs';

const MAX_COUNT = 120;

function zeroPad(num: number): string {
  if (num < 10) return `0${num}`;
  else return num.toString();
}

@Component({
  selector: 'app-check-otp',
  templateUrl: './check-otp.component.html',
  styleUrls: ['./check-otp.component.css']
})
export class CheckOtpComponent implements OnInit {

  reSendOtp() {
    this.authService.reSendOtp().subscribe(
      value => this.ngOnInit()
    );
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    interval(1000).pipe(
      take(MAX_COUNT)
    ).subscribe(i => this.count = MAX_COUNT - i - 1);
  }


  count = MAX_COUNT;

  get formattedTime(): string {
    const mi = Math.floor(this.count / 60);
    const sec = this.count - mi * 60
    return zeroPad(mi) + ":" + zeroPad(sec);
  }


  get phone(): string | undefined {
    return this.authService.phone;
  }

  onSubmit() {
    this.authService.checkOtp(this.otp?.value ?? "").subscribe(
      (user) => {
        this.authService.saveUser(user);
        this.router.navigate(['']);
      }
    );
  }

  form = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
  })

  get otp() { return this.form.get('otp') }
}
