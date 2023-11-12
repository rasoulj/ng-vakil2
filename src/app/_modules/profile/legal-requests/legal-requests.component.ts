import { Component, OnInit } from '@angular/core';

import { LegalRequest, NEW_REQUEST } from './legal-requests.model';
import { catchError } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { LegalRequestDialog } from '../_dialogs/legal-request/legal-request.dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LegalRequestsService } from './legal-requests.service';



const COLUMNS: string[] = ['id', 'title', 'body', 'completed', "actions"];


@Component({
  selector: 'app-legal-requests',
  templateUrl: './legal-requests.component.html',
  styleUrls: ['./legal-requests.component.css']
})
export class LegalRequestsComponent implements OnInit {

  onDelete(req: LegalRequest) {
    this.requestService.deleteOne(req._id).subscribe(
      () => {
        this.loadData();
        this.snackBar.open("Deleted!", "Undo", {
          duration: 5000,
        }).onAction().subscribe(() => {
          this.requestService.addNew(req).subscribe(
            () => this.loadData()
          );

        });
      }
    );
  }

  toggle(request: LegalRequest) {
    try {
      this.requestService.editRequest(request._id, {
        completed: !request.completed,
      }).subscribe();
    } catch (e) {
      console.warn(e);
    }
  }
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
