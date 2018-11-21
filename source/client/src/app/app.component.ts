import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KLD-Fish-Stall-Accounts';

  public _isLoggedIn: boolean;

  constructor() {
    this._isLoggedIn = true;
  }
}
