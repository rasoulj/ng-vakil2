import { Component, EventEmitter, Input, Output } from '@angular/core';
import { limitDots } from '../../utils/utils';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {


  @Input() class: string = "";
  @Input() title: string = "";
  @Input() subtitle: string | undefined;
  @Input() subSubtitle: string | undefined;
  @Input() leadingIcon: string | undefined;
  @Output() click = new EventEmitter<void>();

  limitDots(text?: string | null, limit?: number): string {
    return limitDots(text, limit)
  }

  onClick() {
    this.click.emit();
  }
}
