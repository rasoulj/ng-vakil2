import { Component, Input } from '@angular/core';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {
  @Input() errorMessage?: string = "";
  @Input() noMessage?: string = "";
  @Input() length?: number = 0;

  constructor(private loadingService: LoadingService) {

  }

  get loading() {
    return this.loadingService.isLoading$;
  }
}
