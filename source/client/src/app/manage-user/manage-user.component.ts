import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { Router } from '@angular/router';
import { SharedModelService } from '../shared-model.service';
import { GridComponent } from '../grid/grid.component';
import { User, TextFilter, GridColumn, GridOptions } from '../models/models.module';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent extends BaseComponentModule {

  @ViewChild(GridComponent) _grid: GridComponent;

  _user: User = { ID: -1, Name: '', Password: '', UserID: '' };
  _selectedUser: User = undefined;
  _canByPass: boolean = true;
  _gridOptions: GridOptions = {
    Columns: [
      new GridColumn('Name', 'Name', 'string', true, new TextFilter('', 'eq'))
      new GridColumn('UserID', 'User ID', 'string', true, new TextFilter('', 'eq'))
    ],
    Filterable: true,
    IsPaginated: true,
    PageSize: 20
  };

  constructor(private webApiService: WebapiService, private notifier: NotifierService, router: Router, sharedModel: SharedModelService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getAllUsers();
  }

  getAllUsers() {
    this.webApiService.Get<Array<User>>('User/GetAllUsers', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._grid.clear();
        this._grid.addRows(response);
      }
    });
  }

  clear() {
    this._user = { ID: -1, Name: '', Password: '', UserID: '' };
    this._selectedUser = undefined;
    this._grid.clearSelection();
    this._canByPass = true;
  }

  save() {
    this._canByPass = false;
    if (!this.isFormValid())
      return;

    if (this._user.ID !== -1) {
      this.webApiService.Post<User>('User/EditUser', this._user, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.getAllUsers();
          this.clear();
          this.notifier.notify('success', 'Updated successfully');
        }
      });
    } else {
      this._user.Password = '123qwe!@#';
      this.webApiService.Post<User>('User/AddUser', this._user, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.getAllUsers();
          this.clear();
          this.notifier.notify('success', response.Name + ' added successfully');
        }
      });
    }
  }

  isFormValid() {
    if (!this.isNameValid())
      return false;

    if (!this.isUserIDValid())
      return false;

    return true;
  }

  isNameValid() {
    if (this._canByPass)
      return true;

    return this._user.Name;
  }

  isUserIDValid() {
    if (this._canByPass)
      return true;

    return this._user.UserID;
  }

  selectedUserChanged(user: User) {
    this._selectedUser = user;
  }

  editUser() {
    this._user = { ID: this._selectedUser.ID, Name: this._selectedUser.Name, Password: '', UserID: this._selectedUser.UserID };
  }

  deleteUser() {
    this.webApiService.Get<User>('User/DeleteUser/?id=' + this._selectedUser.ID, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else {
        this.getAllUsers();
        this.clear();
        this.notifier.notify('success', 'User deleted successfully');
      }
    });
  }

}
