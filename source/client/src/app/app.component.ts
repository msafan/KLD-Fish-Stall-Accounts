import { Component } from '@angular/core';
import { SharedModelService } from './shared-model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KLD-Fish-Stall-Accounts';

  constructor(private sharedModel: SharedModelService) {
  }
}
