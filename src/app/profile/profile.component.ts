import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../_services/layout.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isHandset = false;
  constructor(private layoutService: LayoutService) {

  }

  ngOnInit(): void {
    this.layoutService.isHandset$.subscribe(result => {
      this.isHandset = result;
    });
  }

}
