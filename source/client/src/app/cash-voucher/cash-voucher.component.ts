import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { Router } from '@angular/router';
import { SharedModelService } from '../shared-model.service';
import { CashVoucher, GridOptions, NumberFilter, GridColumn, DateFilter, TextFilter, Customer } from '../models/models.module';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';
import { AutoCompleteTextBoxComponent } from '../auto-complete-text-box/auto-complete-text-box.component';
import { GridComponent } from '../grid/grid.component';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-cash-voucher',
  templateUrl: './cash-voucher.component.html',
  styleUrls: ['./cash-voucher.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class CashVoucherComponent extends BaseComponentModule {
  _cashVoucher: CashVoucher = {
    Amount: 0,
    Date: new Date(),
    FK_ID_Customer: -1,
    ID: -1,
    Remarks: '',
    Customer: undefined
  };
  _selectedCashVoucher: CashVoucher = undefined;

  @ViewChild(GridComponent) _grid: GridComponent;
  _gridOptions: GridOptions = {
    Columns: [
      new GridColumn('ID', 'Voucher #', 'number', true, new NumberFilter('', 'eq')),
      new GridColumn('Date', 'Date', 'date', true, new DateFilter('', 'eq', '', '')),
      new GridColumn('Customer.Name', 'Customer', 'string', true, new TextFilter('', 'eq')),
      new GridColumn('Remarks', 'Remarks', 'string', true, new TextFilter('', 'eq')),
      new GridColumn('Amount', 'Amount', 'number', true, new NumberFilter('', 'eq'))
    ],
    Filterable: true,
    IsPaginated: true,
    PageSize: 20
  }

  @ViewChild(AutoCompleteTextBoxComponent) _customerTextBox: AutoCompleteTextBoxComponent;
  _customers: Array<Customer> = [];
  _customerNames: Array<string> = [];
  _selectedCustomer: Customer = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };

  _canByPass: boolean = true;

  constructor(router: Router, sharedModel: SharedModelService, private commonServices: CommonService,
    private webApiService: WebapiService, private notifier: NotifierService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getAllCustomers();
    this.getAllCashVouchers();
  }
  getAllCashVouchers(): any {
    this.webApiService.Get<Array<CashVoucher>>('Invoice/GetAllCashVouchers', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {

        let cashVouchers: Array<CashVoucher> = response.filter(x => true);

        cashVouchers.forEach(item => {
          this._gridOptions.Columns.forEach(column => {
            item[column.Name] = this.commonServices.valueOf(item, column.Name);
          });
        });


        this._grid.clear();
        this._grid.addRows(cashVouchers);
      }
    });
  }

  getAllCustomers() {
    this.webApiService.Get<Array<Customer>>('Customer/GetAllCustomers', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._customers = response;
        this._customerNames = this._customers.map((item) => item.Name);
      }
    });
  }

  isRemarksValid() {
    if (this._canByPass)
      return true;

    return this._cashVoucher.Remarks;
  }

  isAmountValid() {
    if (this._canByPass)
      return true;

    return this._cashVoucher.Amount;
  }

  isCustomerValid() {
    if (this._canByPass)
      return true;

    if (this._cashVoucher.FK_ID_Customer === -1)
      return false;

    return true;
  }

  clear() {
    this._selectedCustomer = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };
    this._customerTextBox.clear();
    this._grid.clearSelection();
    this._canByPass = true;
    this._selectedCashVoucher = undefined;
    this._cashVoucher = { Amount: 0, Date: new Date(), FK_ID_Customer: -1, ID: -1, Remarks: '', Customer: undefined };
  }

  save() {
    this._canByPass = false;

    if (!this.isFormValid())
      return;

    if (this._cashVoucher.ID !== -1) {
      this.webApiService.Post<CashVoucher>('Invoice/EditCashVoucher', this._cashVoucher, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.getAllCashVouchers();
          this.clear();
          this.notifier.notify('success', 'Cash Voucher with # ' + response.ID + ' updated successfully');
        }
      });
    } else {
      this.webApiService.Post<CashVoucher>('Invoice/AddCashVoucher', this._cashVoucher, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.getAllCashVouchers();
          this.clear();
          this.notifier.notify('success', 'Cash Voucher with # ' + response.ID + ' added successfully');
        }
      });
    }
  }

  isFormValid() {
    if (!this.isCustomerValid())
      return false;

    if (!this.isRemarksValid())
      return false;

    if (!this.isAmountValid())
      return false;

    return true;
  }

  customerChanged(customerName: string) {
    if (customerName === '') {
      this._selectedCustomer = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };
      this._cashVoucher.FK_ID_Customer = -1;
      return;
    }
    this._selectedCustomer = this._customers.filter((item) => item.Name === customerName)[0];
    this._cashVoucher.FK_ID_Customer = this._selectedCustomer.ID;
  }

  editCashVoucher() {
    let date: Date = new Date(this._selectedCashVoucher.Date);
    this._cashVoucher.Amount = this._selectedCashVoucher.Amount;
    this._cashVoucher.FK_ID_Customer = this._selectedCashVoucher.FK_ID_Customer;
    this._cashVoucher.Remarks = this._selectedCashVoucher.Remarks;
    this._cashVoucher.ID = this._selectedCashVoucher.ID;
    this._cashVoucher.Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    this._customerTextBox.value = this._customers.filter(x => x.ID == this._cashVoucher.FK_ID_Customer)[0].Name;
  }

  viewCashVoucher() {
    this.router.navigate(['/view-cash-voucher', this._selectedCashVoucher.ID]);
  }

  deleteCashVoucher() {
    this.webApiService.Get<CashVoucher>('Invoice/deleteCashVoucher/?id=' + this._selectedCashVoucher.ID, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else {
        this.getAllCashVouchers();
        this.clear();
        this.notifier.notify('success', 'Cash Voucher deleted successfully');
      }
    });
  }

  selectedCashVoucherChanged(cashVoucher: CashVoucher) {
    this._selectedCashVoucher = cashVoucher;
  }

}
