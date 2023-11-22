import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { EMPTY_USER, UserProfile, isOnlineUser } from 'src/app/_modules/shared/models/user-profile.model';

@Component({
  selector: 'app-lawyer-online-view',
  templateUrl: './lawyer-online-view.component.html',
  styleUrls: ['./lawyer-online-view.component.css']
})
export class LawyerOnlineViewComponent implements OnInit, AfterContentInit {

  _user: Partial<UserProfile> = {};
  @Input() set user(user: Partial<UserProfile>) {
    this._user = user;
    this.onlineStyle = this.calcOnlineStyle();
  }
  get user(): Partial<UserProfile> {
    return this._user;

  }

  onlineStyle: string = '';

  ngOnInit(): void {


  }

  ngAfterContentInit(): void {
    this.onlineStyle = this.calcOnlineStyle();

    interval(15000).subscribe(() => {
      this.onlineStyle = this.calcOnlineStyle();
    })
  }



  calcOnlineStyle(): string {
    return isOnlineUser(this._user) ? "ping" : "gray";
  }
}
