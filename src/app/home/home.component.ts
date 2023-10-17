import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cols: number = 2;

  constructor(private layoutService: LayoutService) {

  }
  ngOnInit(): void {
    this.layoutService.isHandset$.subscribe(result => {
      this.cols = result ? 2 : 1;
    });
  }
}
