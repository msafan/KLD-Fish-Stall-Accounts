import { Component, OnInit } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { PurchaseInvoice } from '../models/models.module';
import { ActivatedRoute, Router } from '@angular/router';
import { WebapiService } from '../webapi.service';
import { PrinterService } from '../printer.service';
import { NotifierService } from 'angular-notifier';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-view-purchase-invoice',
  templateUrl: './view-purchase-invoice.component.html',
  styleUrls: ['./view-purchase-invoice.component.css']
})
export class ViewPurchaseInvoiceComponent extends BaseComponentModule {
  _purchaseInvoice: PurchaseInvoice;

  constructor(private route: ActivatedRoute, private webApiService: WebapiService,
    private notifier: NotifierService, private printService: PrinterService,
    router: Router, sharedModel: SharedModelService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.getPurchaseInvoiceByID(params.id);
      }
    });
  }

  getPurchaseInvoiceByID(id: number) {
    this.webApiService.Get<PurchaseInvoice>('Purchase/GetPurchaseInvoiceByID/?id=' + id, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._purchaseInvoice = response;
      }
    });
  }

  print() {
    let printContents = document.getElementById('print-section').innerHTML;
    this.printService.print(printContents);
  }
}
