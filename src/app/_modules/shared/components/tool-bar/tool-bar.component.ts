import { Component, Input } from '@angular/core';
import { ToolBarButton } from '../tool-bar-button/toolbar-button.model';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent {
  @Input() links: ToolBarButton[] = [];
}
