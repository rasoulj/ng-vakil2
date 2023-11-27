import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';
import { EMPTY_USER, UserProfile } from '../../models/user-profile.model';

@Component({
  selector: 'app-avatar-id',
  templateUrl: './avatar-id.component.html',
  styleUrls: ['./avatar-id.component.css']
})
export class AvatarIdComponent implements OnInit {
  @Input() uid: string = "";
  @Input() height: number = 2.5;
  @Input() style: string = "";
  @Input() link: string | undefined = undefined;
  @Input() showName: boolean = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getUserById(this.uid).subscribe(
      user => {
        return this.user = user;
      }
    );
  }

  user: UserProfile = EMPTY_USER;
}
