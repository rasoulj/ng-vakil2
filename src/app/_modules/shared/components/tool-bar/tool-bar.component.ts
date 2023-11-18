import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToolBarButton } from '../tool-bar-button/toolbar-button.model';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent {

  @Input() links: ToolBarButton[] = [];
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();

  onSignOut() {
    this.signOut.emit();
  }
}
