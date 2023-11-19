import { Component, OnInit } from '@angular/core';
import { MatChipListbox, MatChipListboxChange } from '@angular/material/chips';
import { PersianPipe } from 'src/app/_modules/pipes/persian.pipe';
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
}
