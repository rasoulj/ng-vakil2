import { Component, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { SignInModel } from './signin.model';
import { AuthService } from 'src/app/_modules/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MobileValidator } from 'src/app/_modules/shared/validators/mobile.validator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from 'src/app/_modules/pipes/pipes.module';
import { UserProfile } from '../../models/user-profile.model';
import { interval, take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { LoadingService } from '../../services/loading.service';

enum SignInStageEnum {
  phone = 1,
  otp = 2,
}

const MAX_COUNT = 12;

function zeroPad(num: number): string {
  if (num < 10) return `0${num}`;
  else return num.toString();
}


@Component({
  selector: 'app-signin',
  templateUrl: './signin.dialog.html',
  styleUrls: ['./signin.dialog.css'],
  imports: [
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    PipesModule,
  ],
  standalone: true,

})
export class SigninDialog {


  constructor(
    public dialogRef: DialogRef<SignInModel>,
    @Inject(DIALOG_DATA) public data: SignInModel,
    private authService: AuthService,
    private snack: MatSnackBar,
    private loadingService: LoadingService,

  ) { }

  get loading() {
    return this.loadingService.isLoading$;
  }

  interval$ = interval(1000).subscribe();


  startTimer(): void {
    this.count = MAX_COUNT;
    this.interval$.unsubscribe();
    this.interval$ = interval(1000).pipe(
      take(MAX_COUNT)
    ).subscribe(i => this.count = MAX_COUNT - i - 1);

  }


  count = MAX_COUNT;


  stage: SignInStageEnum = SignInStageEnum.phone;

  onSubmit() {
    this.authService.createOtp(this.phone?.value ?? "").subscribe({
      next: () => {
        this.stage = SignInStageEnum.otp;
        this.startTimer();
      },
      error: (err) => {
        this.snack.open(err.message, PersianPipe.toPersian("ok"), {
          duration: 3000,
          panelClass: "success-snackbar",
        });

      },
    });
  }

  reSendOtp() {
    this.authService.reSendOtp().subscribe(
      (user: UserProfile) => this.startTimer()
    );
  }

  form = new FormGroup({
    phone: new FormControl('09133834091', [Validators.required, MobileValidator.mobileValidator]),
    //password: new FormControl('', [Validators.required]),
  })

  get phone() { return this.form.get('phone') }


  ///// OTP Section

  get formattedTime(): string {
    const mi = Math.floor(this.count / 60);
    const sec = this.count - mi * 60
    return zeroPad(mi) + ":" + zeroPad(sec);
  }


  get phoneOtp(): string {
    return this.authService.phone ?? "";
  }

  onSubmitOtp() {
    this.authService.checkOtp(this.otp?.value ?? "").subscribe({
      next: (user) => {
        if (!!user.accessToken) {
          this.authService.saveUser(user);
          this.dialogRef.close();
          this.snack.open(PersianPipe.toPersian("logged in successfully"), PersianPipe.toPersian("ok"), {
            duration: 3000,
          })
          //this.router.navigate(['']);
        }
      },
      error: (err) => {
        this.otp?.setErrors({ invalidOtp: true });
        // this.snack.open(err.error, PersianPipe.toPersian("ok"), {
        //   duration: 3000,
        //   panelClass: "success-snackbar",
        // });

      }
    });
  }

  formOtp = new FormGroup({
    otp: new FormControl('25374', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
  })

  get otp() { return this.formOtp.get('otp') }

  get invalidOtp(): boolean {
    return this.otp?.getError("invalidOtp");
  }

  changePhone() {
    this.stage = SignInStageEnum.phone;
  }

  registerAsLawyer() {
    this.dialogRef.close({
      registerAsLawyer: true
    });
  }

  close() {
    this.dialogRef.close();
  }

}
