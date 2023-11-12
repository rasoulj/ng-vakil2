import { Component } from '@angular/core';
import { LawyerRegisterService } from '../lawyer-register.service';
import { PickerService } from 'src/app/_modules/shared/services/picker.service';
import { Observable, of } from 'rxjs';
import { stdViewPhone } from 'src/app/_modules/shared/validators/mobile.validator';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GenderEnum, GraduationTypeEnum, LawyerTypeEnum } from 'src/app/_modules/shared/models/user-profile.model';
import { MatSnackBar } from '@angular/material/snack-bar';


interface IContext {
  term: string,
  def: Observable<string | number | undefined>,
}

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent {

  constructor(
    private lawyerRegService: LawyerRegisterService,
    private picker: PickerService,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
  ) { }

  data = this.lawyerRegService.data;

  all: IContext[] = [
    { term: "fullName", def: of(`${this.data.firstName} ${this.data.lastName}`) },
    { term: "expertise1", def: this.picker.getExpertiseName(this.data.expertise1) },
    { term: "expertise2", def: this.picker.getExpertiseName(this.data.expertise2) },
    { term: "address", def: of(this.data.address) },
    { term: "age", def: of(this.data.age) },
    { term: "email", def: of(this.data.email) },
    { term: "gender", def: of(PersianPipe.getEnum('GenderEnum', this.data.gender)) },
    { term: "phone", def: of(stdViewPhone(this.data.phone)) },
    { term: "province", def: this.picker.getProvinceName(this.data.provinceId) },
    { term: "city", def: this.picker.getCityName(this.data.provinceId, this.data.cityId) },
    { term: "bio", def: of(this.data.bio) },
    { term: "graduationType", def: of(PersianPipe.getEnum('GraduationTypeEnum', this.data.graduationType)) },
    { term: "lawyerDocId", def: of(this.data.lawyerDocId) },
    { term: "lawyerType", def: of(PersianPipe.getEnum('LawyerTypeEnum', this.data.lawyerType)) },
  ];


  submit() {
    this.lawyerRegService.create().subscribe({
      next: ({ count }) => {
        // const { count } = data;
        this.router.navigate(['lawyer-register/verify', count]);

      },
      error: (err) => {
        this.snackBar.open(err.error, PersianPipe.toPersian("ok"), {
          duration: 3000,
        })
      },
    })
  }

  cancel() {
    this.location.back();
  }


}
