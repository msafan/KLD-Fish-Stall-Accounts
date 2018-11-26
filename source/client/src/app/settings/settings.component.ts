import { Component, OnInit } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { Router } from '@angular/router';
import { SharedModelService } from '../shared-model.service';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends BaseComponentModule {
  _oldPassword: string;
  _newPassword: string;
  _confirmPassword: string;
  _canByPass: boolean = true;

  constructor(router: Router, sharedModel: SharedModelService,
    private webApiService: WebapiService, private notifier: NotifierService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  save() {
    this._canByPass = false;

    if (!this.isFormValid())
      return;

    this.webApiService.Post<any>('User/ChangeUserPassword', {
      OldPassword: this._oldPassword, Password: this._newPassword, ID: this.sharedModel.User.ID
    }, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else {
        this.notifier.notify('success', 'Password Changed Successfully. Please login with your new credentials');
        this.router.navigate(['/logout']);
      }
    });
  }

  isFormValid() {
    if (!this.isCurrentPasswordValid())
      return false;

    if (!this.isNewPasswordValid())
      return false;

    return true;
  }

  isCurrentPasswordValid() {
    if (this._canByPass)
      return true;

    if (this._oldPassword != '' && this._oldPassword.length < 6)
      return false;

    return this._oldPassword;
  }

  isNewPasswordValid() {
    if (this._canByPass)
      return true;

    if (this._newPassword !== '' && this._newPassword.length < 6)
      return false;

    if (this._newPassword !== this._confirmPassword)
      return false;

    return this._newPassword;

  }
}
