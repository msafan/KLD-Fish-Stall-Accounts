import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { GridComponent } from '../grid/grid.component';
import { Supplier, GridOptions, GridColumn, TextFilter } from '../models/models.module';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-manage-supplier',
  templateUrl: './manage-supplier.component.html',
  styleUrls: ['./manage-supplier.component.css']
})
export class ManageSupplierComponent extends BaseComponentModule {
  @ViewChild(GridComponent) _grid: GridComponent;
  _supplier: Supplier = { ID: -1, Address: '', Name: '', PhoneNumber: '', Balance: 0 };
  _selectedSupplier: Supplier = undefined;
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
    this.getAllSuppliers();
  }

  getAllSuppliers() {
    this.webApiService.Get<Array<Supplier>>('Supplier/GetAllSuppliers', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._grid.clear();
        this._grid.addRows(response);
      }
    });
  }

  clear() {
    this._supplier = { ID: -1, Name: '', Address: '', PhoneNumber: '', Balance: 0 };
    this._selectedSupplier = undefined;
    this._grid.clearSelection();
    this._canByPass = true;
  }

  save() {
    this._canByPass = false;
    if (!this.isFormValid())
      return;

    if (this._supplier.ID !== -1) {
      this.webApiService.Post<Supplier>('Supplier/EditSupplier', this._supplier, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.getAllSuppliers();
          this.clear();
          this.notifier.notify('success', 'Updated successfully');
        }
      });
    } else {
      this.webApiService.Post<Supplier>('Supplier/AddSupplier', this._supplier, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.getAllSuppliers();
          this.clear();
          this.notifier.notify('success', response.Name + ' added successfully');
        }
      });
    }
  }

  editSupplier() {
    this._supplier = {
      ID: this._selectedSupplier.ID,
      Address: this._selectedSupplier.Address,
      Name: this._selectedSupplier.Name,
      PhoneNumber: this._selectedSupplier.PhoneNumber,
      Balance: this._selectedSupplier.Balance
    };
  }

  deleteSupplier() {
    this.webApiService.Get<any>('Supplier/DeleteSupplier/?id=' + this._selectedSupplier.ID, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else {
        this.getAllSuppliers();
        this.clear();
        this.notifier.notify('success', 'Supplier deleted successfully');
      }
    });
  }

  selectedSupplierChanged(supplier: Supplier) {
    this._selectedSupplier = supplier;
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

    return this._supplier.Name;
  }

  isAddressValid() {
    if (this._canByPass)
      return true;

    return this._supplier.Address;
  }

  isPhoneNumberValid() {
    if (this._canByPass)
      return true;

    return this._supplier.PhoneNumber;
  }

  viewSupplier() {
    this.router.navigate(['/view-supplier', this._selectedSupplier.ID]);
  }
}
