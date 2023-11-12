import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.css']
})
export class NoDataComponent {
  constructor(
    // private loadingService: LoadingService,
  ) { }

  @Input() visible: boolean = false;

  // get loading() {
  //   return this.loadingService.isLoading$;
  // }
}