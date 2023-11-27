import { Component } from '@angular/core';
import { UserProfile } from '../../models/user-profile.model';
import { LawyerViewConfig } from '../lawyer-view/lawyer-view.model';

@Component({
  selector: 'app-favorite-lawyers',
  templateUrl: './favorite-lawyers.component.html',
  styleUrls: ['./favorite-lawyers.component.css']
})
export class FavoriteLawyersComponent {
  reloadToggle = false;
  onAction(e: { action: string; user: UserProfile }) {
  }

  config: LawyerViewConfig = {
    role: "lawyer"
  }

}
