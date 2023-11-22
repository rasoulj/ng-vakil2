import { Component, OnInit } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import { Router } from '@angular/router';
import { GeneralViewConfig } from 'src/app/_configs/consts';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
import { LawyerViewConfig } from 'src/app/_modules/shared/components/lawyer-view/lawyer-view.model';
import { UserProfile } from 'src/app/_modules/shared/models/user-profile.model';
import { PickedValue, PickerService } from 'src/app/_modules/shared/services/picker.service';

const ALL: PickedValue = {
  id: 0,
  name: PersianPipe.toPersian("all"),
}

@Component({
  selector: 'app-call-lawyer',
  templateUrl: './call-lawyer.component.html',
  styleUrls: ['./call-lawyer.component.css']
})
export class CallLawyerComponent implements OnInit {

  expertise: PickedValue = ALL;

  constructor(
    private picker: PickerService,
    private router: Router,
  ) { }



  allExpertise: PickedValue[] = [
    ALL,
  ];

  expertiseChanged(chipVal: MatChipListboxChange) {
    const value = chipVal.value
    this.expertise = this.allExpertise.find(x => x.name == value) ?? ALL;
  }

  ngOnInit(): void {
    this.picker.getExpertise(1).subscribe(res => {
      this.allExpertise = [ALL, ...res];
    })
  }

  config: LawyerViewConfig = GeneralViewConfig;

  onAction(e: { action: string; user: UserProfile; }) {
    let path = `/view-lawyer/${e.user._id}`;
    if (e.action !== 'view') {
      path += `/${e.action}`;
    }

    this.router.navigate([path]);
  }
}
