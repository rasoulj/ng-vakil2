import { Component } from '@angular/core';
import { PickerService } from '../../_modules/shared/services/picker.service';
import { combineLatest, map } from 'rxjs';
import { LawyerViewConfig } from 'src/app/_modules/shared/components/lawyer-view/lawyer-view.model';
import { GeneralViewConfig } from 'src/app/_configs/consts';
import { UserProfile } from 'src/app/_modules/shared/models/user-profile.model';
import { Router } from '@angular/router';
import { ToolBarButton } from 'src/app/_modules/shared/components/tool-bar-button/toolbar-button.model';

@Component({
  selector: 'app-search-lawyers',
  templateUrl: './search-lawyers.component.html',
  styleUrls: ['./search-lawyers.component.css']
})
export class SearchLawyersComponent {

  constructor(
    private picker: PickerService,
    private router: Router,
  ) { }

  provinceId = 0;
  expertiseId = 0;


  provinceChanged(id: number) {
    this.provinceId = id;
  }
  expertiseChanged(id: number) {
    this.expertiseId = id;
  }


  get filterCount(): number {
    let r = 0;
    if (this.provinceId) r++;
    if (this.expertiseId) r++;
    return r;
  }


  provinces$ = this.picker.getAddress(0);

  expertise$ = combineLatest([this.picker.getExpertise(1), this.picker.getExpertise(2)]).pipe(
    map(([e1, e2]) => {
      return [...e1, ...e2]
    })
  );

  clearFilters() {
    this.provinceId = 0;
    this.expertiseId = 0;
  }



  config: LawyerViewConfig = GeneralViewConfig;

  onAction(e: { action: ToolBarButton; user: UserProfile; }) {
    let path = `/view-lawyer/${e.user._id}`;
    if (e.action.link !== 'view') {
      path += `/${e.action.link}`;
    }

    this.router.navigate([path]);
  }

}
