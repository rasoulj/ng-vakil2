import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private isHandset$$ = new BehaviorSubject<boolean>(false);
  public isHandset$ = this.isHandset$$.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletLandscape,
      Breakpoints.WebLandscape,

    ])
      .subscribe(result => {
        this.setHandset(result.matches);
      });
  }

  private setHandset(isHandset: boolean) {
    this.isHandset$$.next(isHandset);
  }
}
