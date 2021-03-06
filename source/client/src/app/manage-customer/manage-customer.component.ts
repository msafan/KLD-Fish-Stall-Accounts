import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { GridColumn, NumberFilter, TextFilter, GridOptions, Customer } from '../models/models.module';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { BaseComponentModule } from '../base-component/base-component.module';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent extends BaseComponentModule {
  @ViewChild(GridComponent) _grid: GridComponent;
  _customer: Customer = { ID: -1, Address: '', Name: '', PhoneNumber: '', Balance: 0 };
  _selectedCustomer: Customer = undefined;
  _canByPass: boolean = true;

  _gridOptions: GridOptions = {
    Columns: [
      new GridColumn('Name', 'Name', 'string', true, new TextFilter('', 'eq')),
      new GridColumn('Address', 'Address', 'string', true, new TextFilter('', 'eq')),
      new GridColumn('PhoneNumber', 'Phone Number', 'string', true, new TextFilter('', 'eq'))
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
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.webApiService.Get<Array<Customer>>('Customer/GetAllCustomers', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._grid.clear();
        this._grid.addRows(response);
      }
    });
  }

  clear() {
    this._customer = { ID: -1, Name: '', Address: '', PhoneNumber: '', Balance: 0 };
    this._selectedCustomer = undefined;
    this._grid.clearSelection();
    this._canByPass = true;
  }

  save() {
    this._canByPass = false;
    if (!this.isFormValid())
      return;

    if (this._customer.ID != -1) {
      this.webApiService.Post<Customer>('Customer/EditCustomer', this._customer, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.getAllCustomers();
          this.clear();
          this.notifier.notify('success', 'Updated successfully');
        }
      });
    } else {
      this.webApiService.Post<Customer>('Customer/AddCustomer', this._customer, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.getAllCustomers();
          this.clear();
          this.notifier.notify('success', response.Name + ' added successfully');
        }
      });
    }
  }

  editCustomer() {
    this._customer = {
      ID: this._selectedCustomer.ID,
      Address: this._selectedCustomer.Address,
      Name: this._selectedCustomer.Name,
      PhoneNumber: this._selectedCustomer.PhoneNumber,
      Balance: this._selectedCustomer.Balance
    };
  }

  deleteCustomer() {
    this.webApiService.Get<any>('Customer/DeleteCustomer/?id=' + this._selectedCustomer.ID, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else {
        this.getAllCustomers();
        this.clear();
        this.notifier.notify('success', 'Customer deleted successfully');
      }
    });
  }

  selectedCustomerChanged(customer: Customer) {
    this._selectedCustomer = customer;
  }

  isFormValid() {
    if (!this.isNameValid())
      return false;

    if (!this.isAddressValid())
      return false;

    if (!this.isPhoneNumberValid())
      return false;

    return true;
  }

  isNameValid() {
    if (this._canByPass)
      return true;

    return this._customer.Name;
  }

  isAddressValid() {
    if (this._canByPass)
      return true;

    return this._customer.Address;
  }

  isPhoneNumberValid() {
    if (this._canByPass)
      return true;

    return this._customer.PhoneNumber;
  }

  viewCustomer() {
    this.router.navigate(['/view-customer', this._selectedCustomer.ID]);
  }

}
