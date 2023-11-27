import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, combineLatest, concatMap, debounce, interval } from 'rxjs';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { BASE_URL } from 'src/app/_modules/shared/config/consts';
import { UserProfile } from 'src/app/_modules/shared/models/user-profile.model';
import { LawyerViewConfig } from '../lawyer-view/lawyer-view.model';

const URL = `${BASE_URL}users/search`;

const PROGRESSIVE_ACTIONS = [
  "ok",
]

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
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  @Input() config: LawyerViewConfig = {
    role: "lawyer"
  };
  @Input() isFavorite: boolean = false;

  _pageSizeOptions = [6, 9, 27, 54];
  @Input() set pageSizeOptions(value: number[]) {
    if (value.length >= 2) {
      this._pageSizeOptions = value;
      this.pageSize$.next(value[1]);
      this.pageIndex$.next(0);
    }
  }
  get pageSizeOptions() {
    return this._pageSizeOptions;
  }


  _reloadToggle: boolean = false;
  @Input() set reloadToggle(value: boolean) {
    this._reloadToggle = value;
    this.reloadToggle$.next(value);
  }
  reloadToggle$ = new BehaviorSubject<boolean>(this._reloadToggle);


  @Output() action = new EventEmitter<{ action: string, user: UserProfile }>();

  _provinceId: number = 0;
  @Input() set provinceId(id: number) {
    this._provinceId = id;
    this.provinceId$.next(id);
    this.pageIndex$.next(0);
  }
  get provinceId() { return this._provinceId; };

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
  pageSize$ = new BehaviorSubject<number>((this.pageSizeOptions?.length) >= 2 ? this.pageSizeOptions[1] : 9);



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
    const index = this.lawyers.data.findIndex(u => u.phone === user.phone);

    this.lawyers.data[index].progress = PROGRESSIVE_ACTIONS.includes(action);

    this.action.emit({ action, user });
  }

  lawyers$ = combineLatest([
    this.searchText$.pipe(
      debounce(i => interval(1000))
    ),
    this.provinceId$,
    this.expertiseId$,
    this.pageIndex$.pipe(
      debounce(i => interval(500)),
    ),
    this.pageSize$,
    this.orderBy$,
    this.reloadToggle$,
  ]).pipe(
    //debounce(i => interval(500)),
    concatMap(([
      q,
      provinceId,
      expertiseId,
      pageIndex,
      pageSize,
      orderBy,
      reloadToggle,
    ]) => {
      return this.http.get(URL, {
        params: {
          role: this.config.role ?? "customer",
          q,
          provinceId,
          expertiseId,
          pageIndex,
          pageSize,
          orderBy: orderBy.id,
          isFavorite: this.isFavorite,
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
