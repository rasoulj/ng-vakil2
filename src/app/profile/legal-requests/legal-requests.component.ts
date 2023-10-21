import { Component, OnInit } from '@angular/core';
import { LegalRequestsService } from 'src/app/services/legal-requests.service';

import { LegalRequest } from '../models/legal-requests.model';
import { catchError } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { LegalRequestDialog } from '../dialogs/legal-request/legal-request.dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


const NEW_REQUEST: LegalRequest = {
  id: 0,
  title: '',
  body: '',
  completed: false,
  userId: 0,
}

const COLUMNS: string[] = ['id', 'title', 'body', 'completed'];


@Component({
  selector: 'app-legal-requests',
  templateUrl: './legal-requests.component.html',
  styleUrls: ['./legal-requests.component.css']
})
export class LegalRequestsComponent implements OnInit {
  data: LegalRequest[] = [];
  errorMessage?: string;

  displayedColumns = COLUMNS;

  constructor(
    private requestService: LegalRequestsService,
    public dialog: Dialog,
    private snackBar: MatSnackBar,
  ) { }

  openDialog(legalRequest: LegalRequest): void {
    const dialogRef = this.dialog.open<LegalRequest>(LegalRequestDialog, {
      width: '450px',
      data: legalRequest,
    });

    dialogRef.closed.subscribe(result => {
      if (!result) return;
      this.data.push(result);

      const removeResult = () => {
        const index = this.data.indexOf(result);
        this.data.splice(index, 1);
        return this.data;
      };

      this.requestService.addNew(result)
        .pipe(catchError(err => {
          this.handleError(err);
          return removeResult();
        }))
        .subscribe(res => {
          this.loadData();
        });

    });
  }

  newDialog() {
    return this.openDialog(NEW_REQUEST);
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.requestService.getAll().pipe(
      catchError(this.handleError)
    ).subscribe(res => {
      console.log(res);
      this.data = res;
    });
  }

  handleError(err: any) {
    this.snackBar.open(err.message, 'Close', {
      duration: 3000
    });
    return [];
  }

}
