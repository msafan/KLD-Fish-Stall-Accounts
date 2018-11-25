import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions, GridColumn, NumberFilter, TextFilter, DateFilter, Invoice } from '../models/models.module';
import { Router } from '@angular/router';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';
import { GridComponent } from '../grid/grid.component';
import { CommonService } from '../common.service';
import { BaseComponentModule } from '../base-component/base-component.module';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent extends BaseComponentModule {
  @ViewChild(GridComponent) _grid: GridComponent;
  _selectedInvoice: Invoice = undefined;
  _gridOptions: GridOptions = {
    Columns: [
      new GridColumn('ID', 'Invoice #', 'number', true, new NumberFilter('', 'eq')),
      new GridColumn('Customer.Name', 'Customer Name', 'string', true, new TextFilter('', 'eq')),
      new GridColumn('Date', 'Date', 'date', true, new DateFilter('', 'eq', '', '')),
      new GridColumn('Total', 'Amount', 'number', true, new NumberFilter('', 'eq'))
    ],
    Filterable: true,
    IsPaginated: true,
    PageSize: 20
  };

  constructor(router: Router, sharedModel: SharedModelService, private webApiService: WebapiService,
    private notifier: NotifierService, private commonServices: CommonService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getAllInvoices();
  }

  getAllInvoices() {
    this.webApiService.Get<Array<Invoice>>('Invoice/GetAllInvoices', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._grid.clear();

        let invoices: Array<Invoice> = response.filter(x => true);

        invoices.forEach(item => {
          this._gridOptions.Columns.forEach(column => {
            item[column.Name] = this.commonServices.valueOf(item, column.Name);
          });
        });

        this._grid.addRows(invoices);
      }
    });
  }

  addInvoice() {
    this.router.navigate(['/new-invoice']);
  }

  selectedInvoiceChanged(invoice: Invoice) {
    this._selectedInvoice = invoice;
  }

  viewInvoice() {
    this.router.navigate(['/view-invoice', this._selectedInvoice.ID]);
  }

  editInvoice() {
    this.router.navigate(['/new-invoice', this._selectedInvoice.ID]);
  }

  deleteInvoice() {
    this.webApiService.Get<any>('Invoice/DeleteInvoice/?id=' + this._selectedInvoice.ID, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else {
        this.notifier.notify('success', 'Invoice deleted successfully');
        this.getAllInvoices();
      }
    });
  }

}
