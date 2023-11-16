import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../shared/services/layout.service';
import { getToolbarMenu } from '../shared/config/consts';
import { UserRole, UserRoles } from '../shared/models/user-profile.model';
import { ToolBarButton } from '../shared/components/tool-bar-button/toolbar-button.model';
import { combineLatest } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
  styleUrls: ['./lawyer.component.css']
})
export class LawyerComponent implements OnInit {
  isHandset = false;
  constructor(
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
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
