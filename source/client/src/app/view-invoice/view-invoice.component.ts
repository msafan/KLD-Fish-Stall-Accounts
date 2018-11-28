import { Component, OnInit } from '@angular/core';
import { Invoice } from '../models/models.module';
import { ActivatedRoute, Router } from '@angular/router';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';
import { PrinterService } from '../printer.service';
import { BaseComponentModule } from '../base-component/base-component.module';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent extends BaseComponentModule {
  _invoice: Invoice;

  constructor(private route: ActivatedRoute, private webApiService: WebapiService,
    private notifier: NotifierService, private printService: PrinterService,
    router: Router, sharedModel: SharedModelService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.getInvoiceByID(params.id);
      }
    });
  }

  getInvoiceByID(id: number) {
    this.webApiService.Get<Invoice>('Invoice/GetInvoiceByID/?id=' + id, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._invoice = response;
      }
    });
  }

  print() {
    let printContents = document.getElementById('print-section').innerHTML;
    this.printService.print(printContents);
  }

}
