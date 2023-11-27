

import { Component, Inject } from '@angular/core';
import { PipesModule } from 'src/app/_modules/pipes/pipes.module';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MessageBoxModel } from './message-box.model';
import { ToolBarButton } from '../../components/tool-bar-button/toolbar-button.model';

const Yes: ToolBarButton = {
  title: 'yes',
  link: 'yes',
  icon: 'close',
  color: 'accent',
};

const No: ToolBarButton = {
  title: 'no',
  link: 'no',
  icon: 'close',
};

const DefaultActions: ToolBarButton[] = [
  Yes,
  No,
]

const DefaultMessageBoxModel: MessageBoxModel = {
  title: 'question',
  message: 'confirm message',
  actions: DefaultActions,
}

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
  imports: [
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    PipesModule,
  ],
  standalone: true,
})
export class MessageBoxComponent {

  constructor(
    public dialogRef: DialogRef<Partial<MessageBoxModel>>,
    @Inject(DIALOG_DATA) public data: Partial<MessageBoxModel>,
  ) { }


  onAction(action: string): void {
    this.dialogRef.close({
      action
    });
  }

  close() {
    this.dialogRef.close();
  }

  actions: ToolBarButton[] = this.data?.actions ?? DefaultActions;
  title: string = this.data?.title ?? DefaultMessageBoxModel.title;
  message: string = this.data?.message ?? DefaultMessageBoxModel.message;

}

