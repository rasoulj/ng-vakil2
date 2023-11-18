import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { UserProfile, isOnlineUser } from 'src/app/_modules/shared/models/user-profile.model';

@Component({
  selector: 'app-lawyer-online-view',
  templateUrl: './lawyer-online-view.component.html',
  styleUrls: ['./lawyer-online-view.component.css']
})
export class LawyerOnlineViewComponent implements OnInit {
  @Input() user: Partial<UserProfile> = {};

  onlineStyle: string = '';

  ngOnInit(): void {
    this.onlineStyle = this.calcOnlineStyle();

    interval(15000).subscribe(() => {
      this.onlineStyle = this.calcOnlineStyle();
    })
  }

  calcOnlineStyle(): string {
    return isOnlineUser(this.user) ? "color: red" : "color: gray";
  }
}
