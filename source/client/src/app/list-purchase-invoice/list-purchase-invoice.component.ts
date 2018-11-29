import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { GridComponent } from '../grid/grid.component';
import { GridColumn, GridOptions, PurchaseInvoice, NumberFilter, TextFilter, DateFilter } from '../models/models.module';
import { Router } from '@angular/router';
import { SharedModelService } from '../shared-model.service';
import { WebapiService } from '../webapi.service';
import { CommonService } from '../common.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-list-purchase-invoice',
  templateUrl: './list-purchase-invoice.component.html',
  styleUrls: ['./list-purchase-invoice.component.css']
})
export class ListPurchaseInvoiceComponent extends BaseComponentModule {
  @ViewChild(GridComponent) _grid: GridComponent;
  _selectedPurchaseInvoice: PurchaseInvoice = undefined;
  _gridOptions: GridOptions = {
    Columns: [
      new GridColumn('ID', 'Invoice #', 'number', true, new NumberFilter('', 'eq')),
      new GridColumn('Supplier.Name', 'Supplier Name', 'string', true, new TextFilter('', 'eq')),
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
    this.getAllPurchaseInvoices();
  }

  getAllPurchaseInvoices() {
    this.webApiService.Get<Array<PurchaseInvoice>>('Purchase/GetAllPurchaseInvoices', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._grid.clear();

        let invoices: Array<PurchaseInvoice> = response.filter(x => true);

        invoices.forEach(item => {
          this._gridOptions.Columns.forEach(column => {
            item[column.Name] = this.commonServices.valueOf(item, column.Name);
          });
        });

        this._grid.addRows(invoices);
      }
    });
  }

  addPurchaseInvoice() {
    this.router.navigate(['/new-purchase-invoice']);
  }

  selectedPurchaseInvoiceChanged(invoice: PurchaseInvoice) {
    this._selectedPurchaseInvoice = invoice;
  }

  viewPurchaseInvoice() {
    this.router.navigate(['/view-purchase-invoice', this._selectedPurchaseInvoice.ID]);
  }

  editPurchaseInvoice() {
    this.router.navigate(['/new-purchase-invoice', this._selectedPurchaseInvoice.ID]);
  }

  deletePurchaseInvoice() {
    this.webApiService.Get<any>('Purchase/DeletePurchaseInvoice/?id=' + this._selectedPurchaseInvoice.ID, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else {
        this.notifier.notify('success', 'Invoice deleted successfully');
        this.getAllPurchaseInvoices();
      }
    });
  }
}
