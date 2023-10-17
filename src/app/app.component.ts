import { Component, OnInit } from '@angular/core';
import { PROFILE_TOOLBAR, SIDE_MENU_TOOLBAR } from './profile/config/consts';
import { ToolBarButton } from './profile/models/toolbar-button.model';
import { AuthService } from './services/auth.service';


const HomeToolBar: ToolBarButton = {
  title: "home-page",
  link: "/home",
  icon: "home",
}

const SignInToolBar: ToolBarButton = {
  title: "login",
  link: "/login",
  icon: "login",
}

function getMenu(isLogged: boolean): ToolBarButton[] {
  return isLogged ? PROFILE_TOOLBAR.map(p => {
    return { ...p, link: `/profile/${p.link}` }
  }).filter((_, i) => i < 6 || i > 7) : [];
}

function getMainMenu(isLogged: boolean): ToolBarButton[] {
  return isLogged ? [HomeToolBar, ...SIDE_MENU_TOOLBAR] : [HomeToolBar, ...SIDE_MENU_TOOLBAR, SignInToolBar];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  links = getMainMenu(this.authService.isLogged);
  profileLinks = getMenu(this.authService.isLogged);

  constructor(
    private authService: AuthService,
  ) {

  }



  ngOnInit(): void {
    this.authService.isLogged$.subscribe(isLogged => {
      this.profileLinks = getMenu(isLogged);
      this.links = getMainMenu(this.authService.isLogged);
    })
  }


}
