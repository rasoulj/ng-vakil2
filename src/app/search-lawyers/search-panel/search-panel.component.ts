import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { BehaviorSubject, Observable, combineAll, combineLatest, fromEvent, map, of, tap } from 'rxjs';
import { PickedValue } from 'src/app/_modules/shared/services/picker.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
})
export class SearchPanelComponent implements OnInit {

  @Input() placeholder: string = "";
  @Input() title: string = "";
  @Input() data: Observable<PickedValue[]> = of([]);
  @Output() changed: EventEmitter<number> = new EventEmitter<number>();
  @Input() value: number | null = 0;


  allItems: PickedValue[] = [];

  filter$ = new BehaviorSubject<string>("");

  filter = "";

  ngOnInit(): void {
    combineLatest([this.data, this.filter$]).subscribe(([data, filter]) => {
      this.allItems = data.filter(d => d.name.includes(filter))
    });
  }

  onChange(radio: MatRadioChange) {
    this.changed.emit(radio.value);
  }



  onFilterChange() {
    this.filter$.next(this.filter);
  }

  onClear(e: MouseEvent) {
    this.changed.emit(0);
    e.stopPropagation();
  }


}

