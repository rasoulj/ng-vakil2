import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SIDE_MENU_TOOLBAR } from '../profile/config/consts';
import { LayoutService } from '../_services/layout.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PersianPipe } from '../_pipes/persian.pipe';
import { LoadingService } from '../_services/loading.service';

const MAIN_TITLE = PersianPipe.toPersian("title");

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isHandset = false;
  links = SIDE_MENU_TOOLBAR;
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
  ) { }
  ngOnInit(): void {
    this.layoutService.isHandset$.subscribe(result => {
      this.isHandset = false;
      this.links = [];

      if (result) {
        this.isHandset = true;
        this.links = SIDE_MENU_TOOLBAR;
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
  }


  get loading() {
    return this.loadingService.isLoading$;
  }
}
