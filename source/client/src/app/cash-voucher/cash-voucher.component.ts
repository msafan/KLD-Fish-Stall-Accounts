import { Component, OnInit } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { Router } from '@angular/router';
import { SharedModelService } from '../shared-model.service';
import { CashVoucher, GridOptions, NumberFilter, GridColumn, DateFilter, TextFilter } from '../models/models.module';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

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
    Remarks: ''
  };
  _gridOptions: GridOptions = {
    Columns: [
      new GridColumn('ID', '#', 'number', true, new NumberFilter('', 'eq')),
      new GridColumn('Date', 'Date', 'date', true, new DateFilter('', 'eq', '' ,'')),
      new GridColumn('Customer.Name', 'Customer', 'string', true, new TextFilter('', 'eq')),
      new GridColumn('Remarks', 'Remarks', 'string', true, new TextFilter('', 'eq')),
      new GridColumn('Amount', 'Amount', 'number', true, new NumberFilter('', 'eq'))
    ],
    Filterable: true,
    IsPaginated: true,
    PageSize: 20
  }

  _canByPass: boolean = true;

  constructor(router: Router, sharedModel: SharedModelService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
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

}
