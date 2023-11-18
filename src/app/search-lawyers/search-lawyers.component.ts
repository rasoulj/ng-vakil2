import { Component, OnInit } from '@angular/core';
import { PickedValue, PickerService } from '../_modules/shared/services/picker.service';
import { BehaviorSubject, Observable, combineLatest, combineLatestAll, concat, concatAll, concatMap, debounce, interval, map, merge, mergeAll, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../_modules/shared/config/consts';
import { UserProfile } from '../_modules/shared/models/user-profile.model';
import { PageEvent } from '@angular/material/paginator';

const URL = `${BASE_URL}users/search-lawyer`;

interface SearchLawyer {
  data: UserProfile[],
  length: number,
}

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
  orderBy$ = new BehaviorSubject<OrderByEnum>(OrderByEnum.lastSeen);
  searchText: string = "";

  orderByTypes = [OrderByEnum.lastSeen, OrderByEnum.rating];

  setOrderBy(orderBy: OrderByEnum) {
    this.orderBy$.next(orderBy);
  }


  orderBy = OrderByEnum.lastSeen;


  constructor(
    private picker: PickerService,
    private http: HttpClient,
  ) {
  }


  provinceChanged(id: number) {
    this.provinceId$.next(id);
    this.pageIndex$.next(0);
  }
  expertiseChanged(id: number) {
    this.expertiseId$.next(id);
    this.pageIndex$.next(0);
  }

  defaultPageSize = 9;
  provinceId$ = new BehaviorSubject<number>(0);
  expertiseId$ = new BehaviorSubject<number>(0);
  pageIndex$ = new BehaviorSubject<number>(0);
  pageSize$ = new BehaviorSubject<number>(this.defaultPageSize);

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
    this.pageIndex$.next(0);
  }

  actions = [];

  onAction(action: string, user: UserProfile) {
  }

  q$ = this.searchText$.pipe(
    debounce(i => interval(1000))
  );

  lawyers$ = combineLatest([
    this.q$,
    this.provinceId$,
    this.expertiseId$,
    this.pageIndex$,
    this.pageSize$,
    this.orderBy$
  ]).pipe(
    debounce(i => interval(500)),
    concatMap(([
      q,
      provinceId,
      expertiseId,
      pageIndex,
      pageSize,
      orderBy,
    ]) => {
      return this.http.get(URL, {
        params: {
          q,
          provinceId,
          expertiseId,
          pageIndex,
          pageSize,
          orderBy,
        }
      }) as Observable<SearchLawyer>
    })
  );

  lawyers: SearchLawyer = {
    data: [],
    length: 0
  };

  ngOnInit(): void {
    this.lawyers$.subscribe(lawyers => {
      this.lawyers = lawyers;
    });

    this.orderBy$.subscribe(orderBy => {
      this.orderBy = orderBy;
    })
  }

  searchTextChange() {
    this.searchText$.next(this.searchText);
    this.pageIndex$.next(0);
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex$.next(e.pageIndex);
    this.pageSize$.next(e.pageSize);
  }


}
