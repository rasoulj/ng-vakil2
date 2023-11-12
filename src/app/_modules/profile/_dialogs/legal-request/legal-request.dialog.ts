import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LegalRequest } from '../../legal-requests/legal-requests.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-legal-request-dialog',
  templateUrl: './legal-request.dialog.html',
  styleUrls: ['./legal-request.dialog.css'],
  imports: [
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ],
  standalone: true,
})
export class LegalRequestDialog implements OnInit {
  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    let result: LegalRequest = {
      _id: this.data._id,
      title: this.title.value,
      body: this.body.value,
      completed: this.completed.value,
      userId: this.data.userId,
    };

    this.dialogRef.close(result);
  }
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    completed: new FormControl(false),
  });

  constructor(
    public dialogRef: DialogRef<LegalRequest>,
    @Inject(DIALOG_DATA) public data: LegalRequest,
  ) { }
  ngOnInit(): void {
    this.title.setValue(this.data.title);
    this.body.setValue(this.data.body);
    this.completed.setValue(this.data.completed);
  }

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get body(): FormControl {
    return this.form.get('body') as FormControl;
  }

  get completed(): FormControl {
    return this.form.get('completed') as FormControl;
  }


  get headerText(): string {
    return !this.data._id ? "New Legal Request" : "Edit Legal Request";
  }

}