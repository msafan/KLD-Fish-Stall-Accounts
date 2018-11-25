import { Component, OnInit } from '@angular/core';
import { SharedModelService } from '../shared-model.service';
import { Router } from '@angular/router';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';
import { User } from '../models/models.module';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _userID: string;
  _password: string;
  _canBypass: boolean = true;

  constructor(private sharedModel: SharedModelService, private router: Router,
    private webApiService: WebapiService, private notifier: NotifierService,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
    if (this.sharedModel.User)
      this.router.navigate(['/logout']);
  }

  login() {
    this._canBypass = false;

    if (!this.isFormValid())
      return;

    let user: User = {
      UserID: this._userID,
      Password: this._password,
      ID: -1,
      Name: ''
    };

    this.webApiService.Post<User>('User/Login', user, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this.sharedModel.User = response;
        this.localStorage.set('userCredentails', JSON.stringify(this.sharedModel.User));
        this.router.navigate(['/home']);
      }
    });
  }

  isFormValid() {
    if (!this.isUserIDValid())
      return false;

    if (!this.isPasswordValid())
      return false;

    return true;
  }

  isPasswordValid() {
    if (this._canBypass)
      return true;

    return this._password;
  }

  isUserIDValid() {
    if (this._canBypass)
      return true;

    return this._userID;
  }

}
