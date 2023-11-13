import { Component } from '@angular/core';
import { AuthService } from '../_modules/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../_modules/shared/config/consts';
import { PersianPipe } from '../_modules/pipes/persian.pipe';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
  ) { }


  get user() {
    return this.authService?.getUser();
  }

  get avatar(): string | undefined {
    return this.authService?.getUser()?.avatar;
  }

  uploaded = true;

  setAvatar(avatar: string) {

    this.authService.setUser({ avatar }).subscribe({
      next: () => {
        this.snackBar.open(PersianPipe.toPersian('Avatar uploaded successfully'), PersianPipe.toPersian('Close'), {
          duration: 3000
        });
      },
      error: err => {
        this.snackBar.open(err.error, PersianPipe.toPersian('Close'), {
          duration: 3000
        });
      }
    });
  }

  upload() {
    if (this.file) {
      this.uploaded = true;

      const formData = new FormData();

      formData.append("file", this.file);

      const upload$ = this.http.post(BASE_URL + "upload", formData);

      upload$.subscribe({
        next: (value: any) => {
          this.setAvatar(value.fileName);
        },
        error: (err) => {
          this.snackBar.open(err.error, PersianPipe.toPersian('Close'), {
            duration: 3000
          })
        },
      });
    }
  }


  get fileName() {
    if (this.file) {
      return this.file.name;
    } else return 'No file uploaded yet';
  }

  file?: File;

  onFileSelected(event: any) {

    this.file = event.target.files[0];
    this.uploaded = false;

  }

}
