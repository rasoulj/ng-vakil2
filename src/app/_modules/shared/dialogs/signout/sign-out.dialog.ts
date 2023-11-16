import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PipesModule } from 'src/app/_modules/pipes/pipes.module';
import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.dialog.html',
  styleUrls: ['./sign-out.dialog.css'],
  imports: [
    // FormsModule,
    MatButtonModule,
    // ReactiveFormsModule,
    // MatFormFieldModule,
    CommonModule,
    // MatInputModule,
    MatCardModule,
    MatIconModule,
    PipesModule,
  ],
  standalone: true,
})
export class SignOutDialog {

  constructor(
    public dialogRef: DialogRef<string | null>,
    @Inject(DIALOG_DATA) public data: string | null,
    private authService: AuthService,
    private router: Router,
    private snack: MatSnackBar,
  ) { }


  logout() {
    this.authService.logout();
    this.dialogRef.close();
    this.router.navigate([""]);
    this.snack.open(PersianPipe.toPersian("logged out successfully"), PersianPipe.toPersian("ok"), {
      duration: 3000,
    })
  }

  close() {
    this.dialogRef.close();
  }

}
