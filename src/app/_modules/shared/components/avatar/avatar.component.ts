import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user-profile.model';
import { stdViewPhone } from '../../validators/mobile.validator';
import { getDisplayName } from '../../utils/utils';

const SAT = '48.75%';
const LUM = '53.333%';

function stringToHslColor(str?: string): string {
  const text = (str ?? "AA").trim();
  let hash = 0; //..reduce((s, i) => i + ((s << 5) - s));
  for (let i of text) {
    hash = i.charCodeAt(0) + ((hash << 5) - hash);
  }
  var h = hash % 360;
  return `hsl(${1.0 * h}, ${SAT}, ${LUM})`;
}

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  @Input() height: number = 2.5;
  @Input() user?: Partial<UserProfile> = {};

  get isLogged(): boolean {
    return !!this.user;
  }

  get displayName(): string | undefined {
    return getDisplayName(this.user);
  }




  constructor(
  ) { }

  ngOnInit(): void {

  }

  get style(): string {
    return `width: ${this.height}rem; height: ${this.height}rem; background-color: ${this.color}; font-size: ${this.height / 3}rem`;
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



}
