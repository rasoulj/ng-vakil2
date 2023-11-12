import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToolBarButton } from './toolbar-button.model';

@Component({
  selector: 'app-tool-bar-button',
  templateUrl: './tool-bar-button.component.html',
  styleUrls: ['./tool-bar-button.component.css']
})
export class ToolBarButtonComponent {
  @Input() data: ToolBarButton = { title: '', link: '', icon: '' };
  @Output() click = new EventEmitter<void>();

  onClick(): void {
    this.click.emit();
  }
}
