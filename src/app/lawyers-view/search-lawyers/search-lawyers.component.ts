import { Component, OnInit } from '@angular/core';
import { PickedValue, PickerService } from '../../_modules/shared/services/picker.service';
import { BehaviorSubject, Observable, combineLatest, combineLatestAll, concat, concatAll, concatMap, debounce, interval, map, merge, mergeAll, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../_modules/shared/config/consts';
import { UserProfile } from '../../_modules/shared/models/user-profile.model';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-search-lawyers',
  templateUrl: './search-lawyers.component.html',
  styleUrls: ['./search-lawyers.component.css']
})
export class SearchLawyersComponent {

  constructor(
    private picker: PickerService,
  ) { }

  provinceId = 0;
  expertiseId = 0;


  provinceChanged(id: number) {
    this.provinceId = id;
  }
  expertiseChanged(id: number) {
    this.expertiseId = id;
  }


  get filterCount(): number {
    let r = 0;
    if (this.provinceId) r++;
    if (this.expertiseId) r++;
    return r;
  }


  provinces$ = this.picker.getAddress(0);

  expertise$ = combineLatest([this.picker.getExpertise(1), this.picker.getExpertise(2)]).pipe(
    map(([e1, e2]) => {
      return [...e1, ...e2]
    })
  );

  clearFilters() {
    this.provinceId = 0;
    this.expertiseId = 0;
  }





}
