import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, combineLatest, concatMap, debounce, interval } from 'rxjs';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { BASE_URL } from 'src/app/_modules/shared/config/consts';
import { UserProfile } from 'src/app/_modules/shared/models/user-profile.model';
import { PickedValue } from 'src/app/_modules/shared/services/picker.service';

const URL = `${BASE_URL}users/search-lawyer`;


interface SearchLawyer {
  data: UserProfile[],
  length: number,
}

enum OrderByEnum {
  lastSeen = "lastSeen",
  rating = "rating",
}


interface KeyValue {
  name: string,
  id: OrderByEnum,
}


@Component({
  selector: 'app-lawyers-panel',
  templateUrl: './lawyers-panel.component.html',
  styleUrls: ['./lawyers-panel.component.css']
})
export class LawyersPanelComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }


  _provinceId: number = 0;
  @Input() set provinceId(id: number) {
    this._provinceId = id;
    this.provinceId$.next(id);
    this.pageIndex$.next(0);
  }
  get provinceId() { return this._provinceId; };


  _pageSize: number = 9;
  @Input() set pageSize(id: number) {
    this._pageSize = id;
    this.pageSize$.next(id);
    this.pageIndex$.next(0);
    this.pageSizeOptions = id == 9 ? [6, 9, 27, 54] : [5, 10, 25, 50];
  }
  get pageSize() { return this._pageSize; };


  _expertiseId: number = 0;
  @Input() set expertiseId(id: number) {
    this._expertiseId = id;
    this.expertiseId$.next(id);
    this.pageIndex$.next(0);
  }
  get expertiseId() { return this._expertiseId; };

  orderByTypes: KeyValue[] = [
    { name: PersianPipe.toPersian('enum.OrderByEnum.' + OrderByEnum.lastSeen), id: OrderByEnum.lastSeen },
    { name: PersianPipe.toPersian('enum.OrderByEnum.' + OrderByEnum.rating), id: OrderByEnum.rating },
  ]

  searchText$ = new BehaviorSubject<string>("");
  orderBy$ = new BehaviorSubject<KeyValue>(this.orderByTypes[0]);
  orderBy = this.orderByTypes[0];
  searchText: string = "";



  provinceId$ = new BehaviorSubject<number>(0);
  expertiseId$ = new BehaviorSubject<number>(0);
  pageIndex$ = new BehaviorSubject<number>(0);
  pageSize$ = new BehaviorSubject<number>(9);


  actions = [];

  pageSizeOptions = [6, 9, 27, 54];

  searchTextChange() {
    this.searchText$.next(this.searchText);
    this.pageIndex$.next(0);
  }

  setOrderBy($event: MatChipListboxChange) {
    const value = $event.value
    const orderBy = this.orderByTypes.find((x: any) => x.name == value) ?? this.orderByTypes[0];

    this.orderBy$.next(orderBy);
    this.pageIndex$.next(0);

  }

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
          orderBy: orderBy.id,
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


  handlePageEvent(e: PageEvent) {
    this.pageIndex$.next(e.pageIndex);
    this.pageSize$.next(e.pageSize);
  }



}
