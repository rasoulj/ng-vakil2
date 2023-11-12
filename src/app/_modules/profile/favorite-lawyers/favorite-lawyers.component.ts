import { Component } from '@angular/core';
import { FavoriteLawyer } from './favorite-lawyers.model';
import { catchError } from 'rxjs';
import { FavoriteLawyersService } from './favorite-lawyers.service';

@Component({
  selector: 'app-favorite-lawyers',
  templateUrl: './favorite-lawyers.component.html',
  styleUrls: ['./favorite-lawyers.component.css']
})
export class FavoriteLawyersComponent {
  data: FavoriteLawyer[] = [];
  errorMessage?: string;

  constructor(
    private requestService: FavoriteLawyersService,
  ) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.requestService.getAll().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return [];
      })
    ).subscribe(res => {
      this.data = res;
    });
  }

}
