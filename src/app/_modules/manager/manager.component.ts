import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ToolBarButton } from '../shared/components/tool-bar-button/toolbar-button.model';
import { getToolbarMenu } from '../shared/config/consts';
import { AuthService } from '../shared/services/auth.service';
import { LayoutService } from '../shared/services/layout.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  isHandset = false;
  constructor(
    private layoutService: LayoutService,
    private authService: AuthService,
  ) { }

  links: ToolBarButton[] = [];

  ngOnInit(): void {
    combineLatest([this.layoutService.isHandset$, this.authService.loggedUser$]).subscribe(([result, user]) => {
      this.isHandset = false;
      this.links = [];

      this.isHandset = result;
      this.links = getToolbarMenu(user?.role);
    });
  }
}
