import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { PaymentVoucher, GridOptions, GridColumn, NumberFilter, TextFilter, DateFilter, Supplier } from '../models/models.module';
import { GridComponent } from '../grid/grid.component';
import { AutoCompleteTextBoxComponent } from '../auto-complete-text-box/auto-complete-text-box.component';
import { SharedModelService } from '../shared-model.service';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { NotifierService } from 'angular-notifier';
import { WebapiService } from '../webapi.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-voucher',
  templateUrl: './payment-voucher.component.html',
  styleUrls: ['./payment-voucher.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PaymentVoucherComponent extends BaseComponentModule {
  _paymentVoucher: PaymentVoucher = {
    Amount: 0,
    Date: new Date(),
    FK_ID_Supplier: -1,
    ID: -1,
    Remarks: '',
    Supplier: undefined
  };
  _selectedPaymentVoucher: PaymentVoucher = undefined;

  @ViewChild(GridComponent) _grid: GridComponent;
  _gridOptions: GridOptions = {
    Columns: [
      new GridColumn('ID', 'Voucher #', 'number', true, new NumberFilter('', 'eq')),
      new GridColumn('Date', 'Date', 'date', true, new DateFilter('', 'eq', '', '')),
      new GridColumn('Supplier.Name', 'Supplier', 'string', true, new TextFilter('', 'eq')),
      new GridColumn('Remarks', 'Remarks', 'string', true, new TextFilter('', 'eq')),
      new GridColumn('Amount', 'Amount', 'number', true, new NumberFilter('', 'eq'))
    ],
    Filterable: true,
    IsPaginated: true,
    PageSize: 20
  }

  @ViewChild(AutoCompleteTextBoxComponent) _supplierTextBox: AutoCompleteTextBoxComponent;
  _suppliers: Array<Supplier> = [];
  _supplierNames: Array<string> = [];
  _selectedSupplier: Supplier = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };

  _canByPass: boolean = true;

  constructor(router: Router, sharedModel: SharedModelService, private commonServices: CommonService,
    private webApiService: WebapiService, private notifier: NotifierService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getAllSuppliers();
    this.getAllPaymentVouchers();
  }
  getAllPaymentVouchers(): any {
    this.webApiService.Get<Array<PaymentVoucher>>('Purchase/GetAllPaymentVouchers', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {

        let paymentVouchers: Array<PaymentVoucher> = response.filter(x => true);

        paymentVouchers.forEach(item => {
          this._gridOptions.Columns.forEach(column => {
            item[column.Name] = this.commonServices.valueOf(item, column.Name);
          });
        });


        this._grid.clear();
        this._grid.addRows(paymentVouchers);
      }
    });
  }

  getAllSuppliers() {
    this.webApiService.Get<Array<Supplier>>('Supplier/GetAllSuppliers', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._suppliers = response;
        this._supplierNames = this._suppliers.map((item) => item.Name);
      }
    });
  }

  isRemarksValid() {
    if (this._canByPass)
      return true;

    return this._paymentVoucher.Remarks;
  }

  isAmountValid() {
    if (this._canByPass)
      return true;

    return this._paymentVoucher.Amount;
  }

  isSupplierValid() {
    if (this._canByPass)
      return true;

    if (this._paymentVoucher.FK_ID_Supplier === -1)
      return false;

    return true;
  }

  clear() {
    this._selectedSupplier = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };
    this._supplierTextBox.clear();
    this._grid.clearSelection();
    this._canByPass = true;
    this._selectedPaymentVoucher = undefined;
    this._paymentVoucher = { Amount: 0, Date: new Date(), FK_ID_Supplier: -1, ID: -1, Remarks: '', Supplier: undefined };
  }

  save() {
    this._canByPass = false;

    if (!this.isFormValid())
      return;

    if (this._paymentVoucher.ID !== -1) {
      this.webApiService.Post<PaymentVoucher>('Purchase/EditPaymentVoucher', this._paymentVoucher, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.getAllPaymentVouchers();
          this.clear();
          this.notifier.notify('success', 'Voucher with # ' + response.ID + ' updated successfully');
        }
      });
    } else {
      this.webApiService.Post<PaymentVoucher>('Purchase/AddPaymentVoucher', this._paymentVoucher, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.getAllPaymentVouchers();
          this.clear();
          this.notifier.notify('success', 'Voucher with # ' + response.ID + ' added successfully');
        }
      });
    }
  }

  isFormValid() {
    if (!this.isSupplierValid())
      return false;

    if (!this.isRemarksValid())
      return false;

    if (!this.isAmountValid())
      return false;

    return true;
  }

  supplierChanged(supplierName: string) {
    if (supplierName === '') {
      this._selectedSupplier = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };
      this._paymentVoucher.FK_ID_Supplier = -1;
      return;
    }
    this._selectedSupplier = this._suppliers.filter((item) => item.Name === supplierName)[0];
    this._paymentVoucher.FK_ID_Supplier = this._selectedSupplier.ID;
  }

  editPaymentVoucher() {
    let date: Date = new Date(this._selectedPaymentVoucher.Date);
    this._paymentVoucher.Amount = this._selectedPaymentVoucher.Amount;
    this._paymentVoucher.FK_ID_Supplier = this._selectedPaymentVoucher.FK_ID_Supplier;
    this._paymentVoucher.Remarks = this._selectedPaymentVoucher.Remarks;
    this._paymentVoucher.ID = this._selectedPaymentVoucher.ID;
    this._paymentVoucher.Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    this._supplierTextBox.value = this._suppliers.filter(x => x.ID === this._paymentVoucher.FK_ID_Supplier)[0].Name;
  }

  viewPaymentVoucher() {
    this.router.navigate(['/view-payment-voucher', this._selectedPaymentVoucher.ID]);
  }

  deletePaymentVoucher() {
    this.webApiService.Get<PaymentVoucher>('Purchase/deletePaymentVoucher/?id=' + this._selectedPaymentVoucher.ID, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else {
        this.getAllPaymentVouchers();
        this.clear();
        this.notifier.notify('success', 'Voucher deleted successfully');
      }
    });
  }

  selectedPaymentVoucherChanged(paymentVoucher: PaymentVoucher) {
    this._selectedPaymentVoucher = paymentVoucher;
  }

}
