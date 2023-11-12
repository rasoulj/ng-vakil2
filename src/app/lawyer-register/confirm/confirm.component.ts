import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  get code() {
    return this.route.snapshot.params['code']
  }

  goHome() {
    this.router.navigate(['/'])
  }


}
