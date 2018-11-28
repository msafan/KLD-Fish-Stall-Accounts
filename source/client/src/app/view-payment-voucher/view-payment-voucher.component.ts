import { Component, OnInit } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModelService } from '../shared-model.service';
import { PrinterService } from '../printer.service';
import { NotifierService } from 'angular-notifier';
import { WebapiService } from '../webapi.service';
import { PaymentVoucher } from '../models/models.module';

@Component({
  selector: 'app-view-payment-voucher',
  templateUrl: './view-payment-voucher.component.html',
  styleUrls: ['./view-payment-voucher.component.css']
})
export class ViewPaymentVoucherComponent extends BaseComponentModule {
  _paymentVoucher: PaymentVoucher;

  constructor(router: Router, sharedModel: SharedModelService, private printService: PrinterService,
    private activatedRoute: ActivatedRoute, private webApiService: WebapiService, private notifier: NotifierService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.getPaymentVoucherByID(params.id);
      }
    });
  }

  getPaymentVoucherByID(id: number) {
    this.webApiService.Get<PaymentVoucher>('Purchase/GetPaymentVoucherByID/?id=' + id, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._paymentVoucher = response;
      }
    });
  }

  print() {
    let printContents = document.getElementById('print-section').innerHTML;
    this.printService.print(printContents);
  }
}
