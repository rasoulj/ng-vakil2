import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LayoutService } from '../_modules/shared/services/layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, map, mergeAll } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PersianPipe } from '../_modules/pipes/persian.pipe';
import { LoadingService } from '../_modules/shared/services/loading.service';
import { getHeaderMenu, getSideMenu } from '../_modules/shared/config/consts';
import { UserRole, UserRoles } from '../_modules/shared/models/user-profile.model';
import { AuthService } from '../_modules/shared/services/auth.service';
import { ToolBarButton } from '../_modules/shared/components/tool-bar-button/toolbar-button.model';

const MAIN_TITLE = PersianPipe.toPersian("title");

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

      this.title = title;
      this.titleService.setTitle(title === "" ? MAIN_TITLE : `${MAIN_TITLE} | ${PersianPipe.toPersian(title)}`);
    });

    // this.authService.loggedUser$.subscribe((user) => {
    //   this.links = getSideMenu(user?.role);
    // });
  }


  get loading() {
    return this.loadingService.isLoading$;
  }


}
