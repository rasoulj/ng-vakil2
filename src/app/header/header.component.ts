import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LayoutService } from '../_modules/shared/services/layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PersianPipe } from '../_modules/pipes/persian.pipe';
import { LoadingService } from '../_modules/shared/services/loading.service';
import { getHeaderMenu } from '../_modules/shared/config/consts';
import { UserProfile } from '../_modules/shared/models/user-profile.model';
import { AuthService } from '../_modules/shared/services/auth.service';
import { ToolBarButton } from '../_modules/shared/components/tool-bar-button/toolbar-button.model';

const MAIN_TITLE = PersianPipe.toPersian("title");

const LAST_ID = ['view-lawyer', 'my-questions', 'customers'];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isHandset = false;
  links: ToolBarButton[] = [];
  title = "title";

  @Output() menuClick = new EventEmitter<void>();

  onClick() {
    this.menuClick.emit();
  }

  constructor(
    private titleService: Title,
    private layoutService: LayoutService,
    private router: Router,
    private loadingService: LoadingService,
    private authService: AuthService,
  ) { }
  ngOnInit(): void {
    combineLatest([this.layoutService.isHandset$, this.authService.loggedUser$]).subscribe(([result, user]) => {
      this.isHandset = false;
      this.links = [];

      if (result) {
        this.isHandset = true;
        this.links = getHeaderMenu(user?.role);
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(e => (<NavigationEnd>e).url),
    ).subscribe(url => {
      const tt = url.split("/");
      let title = tt[tt.length - 1];
      this.title = tt[tt.length - 1];
      if (title === "home") {
        title = "";
      }

      if (tt.length >= 2 && LAST_ID.includes(tt[tt.length - 2])) {
        title = tt[tt.length - 2] + ".detail";
      }

      this.title = title;
      this.titleService.setTitle(title === "" ? MAIN_TITLE : `${MAIN_TITLE} | ${PersianPipe.toPersian(title)}`);
    });
  }


  get loading() {
    return this.loadingService.isLoading$;
  }

  get loggedUser(): UserProfile | undefined {
    return this.authService.getUser();
  }


}
