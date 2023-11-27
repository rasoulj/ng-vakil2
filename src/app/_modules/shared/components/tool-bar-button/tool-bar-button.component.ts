import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToolBarButton } from './toolbar-button.model';
import { AuthService } from '../../services/auth.service';
import { SignOutDialog } from '../../dialogs/signout/sign-out.dialog';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-tool-bar-button',
  templateUrl: './tool-bar-button.component.html',
  styleUrls: ['./tool-bar-button.component.css']
})
export class ToolBarButtonComponent {
  @Input() data: ToolBarButton = { title: '', link: '', icon: '' };
  @Output() click = new EventEmitter<void>();

  constructor(
    public dialog: Dialog,
  ) { }

  onSignOut() {
    this.click.emit();

    const dialogRef = this.dialog.open<string | null>(SignOutDialog, {
      width: '450px',
      data: null,
    });
  }


  onClick(): void {
    this.click.emit();
  }
}
