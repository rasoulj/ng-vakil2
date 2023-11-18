import { Component, OnInit } from '@angular/core';
import { PickedValue, PickerService } from '../_modules/shared/services/picker.service';
import { BehaviorSubject, Observable, combineLatest, combineLatestAll, concat, concatAll, concatMap, debounce, interval, map, merge, mergeAll, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../_modules/shared/config/consts';
import { UserProfile } from '../_modules/shared/models/user-profile.model';

const URL = `${BASE_URL}users/search-lawyer`;

enum OrderByEnum {
  lastSeen = "lastSeen",
  rating = "rating",
}

@Component({
  selector: 'app-search-lawyers',
  templateUrl: './search-lawyers.component.html',
  styleUrls: ['./search-lawyers.component.css']
})
export class SearchLawyersComponent implements OnInit {

  searchText$ = new BehaviorSubject<string>("");
  searchText: string = "";

  orderByTypes = [OrderByEnum.lastSeen, OrderByEnum.rating];

  _orderBy: OrderByEnum = OrderByEnum.lastSeen;
  set orderBy(value: OrderByEnum) {
    this._orderBy = value;
  }
  get orderBy(): string {
    return this._orderBy;
  }


  constructor(
    private picker: PickerService,
    private http: HttpClient,
  ) {
  }


  provinceChanged(id: number) {
    this.provinceId$.next(id);
  }
  expertiseChanged(id: number) {
    this.expertiseId$.next(id);
  }

  provinceId$ = new BehaviorSubject<number>(0);
  expertiseId$ = new BehaviorSubject<number>(0);

  get filterCount(): Observable<number> {
    return combineLatest([this.provinceId$, this.expertiseId$]).pipe(
      map(([provinceId, expertiseId]) => {
        let r = 0;
        if (provinceId) r++;
        if (expertiseId) r++;
        return r;
      })
    );
  }


  provinces$ = this.picker.getAddress(0);

  expertise$ = combineLatest([this.picker.getExpertise(1), this.picker.getExpertise(2)]).pipe(
    map(([e1, e2]) => {
      return [...e1, ...e2]
    })
  );

  clearFilters() {
    this.provinceId$.next(0);
    this.expertiseId$.next(0);
  }

  actions = [];

  onAction(action: string, user: UserProfile) {
  }

  q$ = this.searchText$.pipe(
    debounce(i => interval(1000))
  );

  lawyers$ = combineLatest([this.q$, this.provinceId$, this.expertiseId$]).pipe(
    debounce(i => interval(500)),
    concatMap(([q, provinceId, expertiseId]) => {
      return this.http.get(URL, {
        params: {
          q,
          provinceId,
          expertiseId,
        }
      }) as Observable<UserProfile[]>
    })
  );

  lawyers: UserProfile[] = [];

  ngOnInit(): void {
    this.lawyers$.subscribe(lawyers => {
      this.lawyers = lawyers;
    })
  }

  searchTextChange() {
    this.searchText$.next(this.searchText);
  }


}
