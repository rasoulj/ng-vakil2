import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../_modules/shared/services/layout.service';
import { BehaviorSubject, map } from 'rxjs';
import { PickerService, PickedValue } from '../_modules/shared/services/picker.service';
import { Router } from '@angular/router';
import { LawyerRegisterService } from './lawyer-register.service';
import { LoadingService } from '../_modules/shared/services/loading.service';

@Component({
  selector: 'app-lawyer-register',
  templateUrl: './lawyer-register.component.html',
  styleUrls: ['./lawyer-register.component.css']
})
export class LawyerRegisterComponent implements OnInit {
  provinceChanged(provinceId: number, resetCity: boolean) {
    if (!provinceId) return;

    this.picker.getAddress(provinceId).subscribe(value => {
      if (resetCity) {
        this.c("cityId")?.setValue(undefined);
      }
      return this.cityIds$.next(value);
    });
  }

  onSubmit() {
    this.router.navigate(["lawyer-register", "verify"])
  }

  constructor(
    private layout: LayoutService,
    private picker: PickerService,
    private router: Router,
    public lawyerRegService: LawyerRegisterService,
    private loadingService: LoadingService,
  ) {
  }

  get loading() {
    return this.loadingService.isLoading$;
  }

  ngOnInit(): void {
    const provinceId = this.lawyerRegService.data.provinceId;

    this.provinceChanged(provinceId ?? 0, false);
  }

  className$ = this.layout.isHandset$.pipe(
    map(value => !value ? "full-width" : "one-third-width")
  );

  radioCN$ = this.layout.isHandset$.pipe(
    map(value => !value ? "radio-100" : "radio-33")
  );

  form = this.lawyerRegService.form;

  c(name: string) { return this.form.get(name) }

  getError(name: string, field: string) {
    return this.c(name)?.getError(field);
  }

  cityIds$ = new BehaviorSubject<PickedValue[]>([]);

  birthYears = this.picker.getBirthYears();
  expertise1$ = this.picker.getExpertise(1);
  expertise2$ = this.picker.getExpertise(2);
  graduationType = this.picker.getGraduationType();
  lawyerType = this.picker.getLawyerType();
  genderType = this.picker.getGenderType();
  provinceIds$ = this.picker.getAddress(0);

}
