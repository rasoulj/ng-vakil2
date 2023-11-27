import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { MessageBoxModel, StringFunction } from '../dialogs/message-box/message-box.model';
import { MessageBoxComponent } from '../dialogs/message-box/message-box.component';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  constructor(
    private dialog: Dialog,
  ) { }

  open(cb?: StringFunction, data?: Partial<MessageBoxModel>) {
    const dialogRef = this.dialog.open<MessageBoxModel>(MessageBoxComponent, {
      width: '450px',
      data,
    });

    dialogRef.closed.subscribe((value?: Partial<MessageBoxModel>) => {
      if (!value || !cb) return;

      cb(value?.action);
    })
  }
}
