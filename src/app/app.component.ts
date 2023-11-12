import { Component, OnInit } from '@angular/core';
import { AuthService } from './_modules/shared/services/auth.service';
import { ToolBarButton } from './_modules/shared/components/tool-bar-button/toolbar-button.model';
import { getSideMenu, getToolbarMenu } from './_modules/shared/config/consts';
import { UserProfile } from './_modules/shared/models/user-profile.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  links: ToolBarButton[] = [];
  profileLinks: ToolBarButton[] = [];

  constructor(
    private authService: AuthService,
  ) {

  }

  get loggedUser(): UserProfile | undefined {
    return this.authService.getUser();
  }

  get displayName(): string {
    return this.authService.displayName ?? '--';
  }



  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(user => {
      this.profileLinks = getToolbarMenu(user?.role);
      this.links = getSideMenu(user?.role);
    })
  }


}
