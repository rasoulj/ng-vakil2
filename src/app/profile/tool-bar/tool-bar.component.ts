import { Component } from '@angular/core';
import { PROFILE_TOOLBAR } from "../config/consts";

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent {
  links = PROFILE_TOOLBAR;
}
