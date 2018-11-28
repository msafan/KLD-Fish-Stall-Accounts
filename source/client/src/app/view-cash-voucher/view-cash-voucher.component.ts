import { Component, OnInit } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModelService } from '../shared-model.service';
import { PrinterService } from '../printer.service';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';
import { CashVoucher } from '../models/models.module';

@Component({
  selector: 'app-view-cash-voucher',
  templateUrl: './view-cash-voucher.component.html',
  styleUrls: ['./view-cash-voucher.component.css']
})
export class ViewCashVoucherComponent extends BaseComponentModule {
  _cashVoucher: CashVoucher;

  constructor(router: Router, sharedModel: SharedModelService, private printService: PrinterService,
    private activatedRoute: ActivatedRoute, private webApiService: WebapiService, private notifier: NotifierService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.getCashVoucherByID(params.id);
      }
    });
  }

  getCashVoucherByID(id: number) {
    this.webApiService.Get<CashVoucher>('Invoice/GetCashVoucherByID/?id=' + id, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._cashVoucher = response;
      }
    });
  }

  print() {
    let printContents = document.getElementById('print-section').innerHTML;
    this.printService.print(printContents);
  }
}
