import { Component, Input, OnInit } from '@angular/core';
import { UserProfile, getDisplayName, isOnlineUser } from '../../models/user-profile.model';
import { BASE_URL } from '../../config/consts';
import { stringToHslColor } from '../../utils/utils';




@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  @Input() height: number = 2.5;
  @Input() user?: Partial<UserProfile> | null = {};
  @Input() style: string = "";
  @Input() divStyle: string = "";
  @Input() link: string | undefined = undefined;
  @Input() showName: boolean = false;

  actLink?: string = this.link ?? (!this.user?._id ? undefined : `/view-lawyer/${this.user?._id}`);
  // actLink?: string = undefined;  //

  get hasUser(): boolean {
    return !!(this.user?._id);
  }

  get displayName(): string | undefined {
    return getDisplayName(this.user);
  }




  constructor(
  ) { }

  ngOnInit(): void {
    this.actLink = this.link ?? (this.user?._id ? `/view-lawyer/${this.user?._id}` : undefined);
  }

  get moreStyle(): string {
    return `${this.style} object-fit: cover; width: ${this.height}rem; height: ${this.height}rem; background-color: ${this.color}; font-size: ${this.height / 3}rem`;
  }

  get textStyle(): string {
    return this.height > 10 ? "font-size: 1.5rem; padding: 1rem; font-weight: 600;" : '';
  }

  get color(): string {
    return stringToHslColor(this.displayName)
  }

  get name(): string {
    const tt = (this.displayName ?? '--').split(' ');
    if (tt.length === 0) return '--';
    else if (tt.length === 1) {
      if (tt[0].startsWith('09')) {
        return tt[0].substring(tt[0].length - 4);
      }
      return tt[0].substring(0, 2);
    }
    else return `${tt[0][0]} ${tt[1][0]}`;
  }


  get avatar(): string | undefined {
    const avatar = this.user?.avatar;
    if (!avatar) return undefined;
    else return `${BASE_URL}static/${avatar}`;
  }

}

