import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, DateRange, CustomerStatement, Invoice, CashVoucher, GridOptions, GridColumn, NumberFilter, TextFilter, DateFilter } from '../models/models.module';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';
import { GridComponent } from '../grid/grid.component';
import { PrinterService } from '../printer.service';
import { SharedModelService } from '../shared-model.service';
import { BaseComponentModule } from '../base-component/base-component.module';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent extends BaseComponentModule {
  _customer: Customer;
  @ViewChild(GridComponent) _customerStatement: GridComponent;
  @ViewChild(GridComponent) _cashVouchers: GridComponent;
  @ViewChild(GridComponent) _invoices: GridComponent;

  _selectedCustomerStatement: CustomerStatement = undefined;
  _selectedInvoice: Invoice = undefined;
  _selectedCashVoucher: CashVoucher = undefined;

  _customerStatementGridOptions: GridOptions = {
    Columns: [
      new GridColumn('Date', 'Date', 'date', true, new DateFilter('', 'eq', '', '')),
      new GridColumn('ID', '#', 'number', true, new NumberFilter('', 'eq')),
      new GridColumn('Particulars', 'Particulars', 'string', true, new TextFilter('', 'eq')),
      new GridColumn('Total', 'Amount', 'number', true, new NumberFilter('', 'eq')),
      new GridColumn('Balance', 'Balance', 'number', true, new NumberFilter('', 'eq'))
    ],
    Filterable: true,
    IsPaginated: true,
    PageSize: 20
  }
  _invoicesGridOptions: GridOptions = {
    Columns: [
      new GridColumn('Date', 'Date', 'date', true, new DateFilter('', 'eq', '', '')),
      new GridColumn('ID', 'Invoice Number', 'number', true, new NumberFilter('', 'eq')),
      new GridColumn('Total', 'Amount', 'number', true, new NumberFilter('', 'eq')),
    ],
    Filterable: true,
    IsPaginated: true,
    PageSize: 20
  }
  _cashVouchersGridOptions: GridOptions = {
    Columns: [
      new GridColumn('Date', 'Date', 'date', true, new DateFilter('', 'eq', '', '')),
      new GridColumn('ID', 'Voucher Number', 'number', true, new NumberFilter('', 'eq')),
      new GridColumn('Remarks', 'Remarks', 'string', true, new TextFilter('', 'eq')),
      new GridColumn('Amount', 'Amount', 'number', true, new NumberFilter('', 'eq')),
    ],
    Filterable: true,
    IsPaginated: true,
    PageSize: 20
  }

  constructor(private activatedRoute: ActivatedRoute, private webApiService: WebapiService,
    private notifier: NotifierService, private printService: PrinterService,
    router: Router, sharedModel: SharedModelService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.getCustomerByID(params.id);
        this.getCustomerStatement(params.id, undefined);
        this.getAllInvoicesByCustomerID(params.id);
        this.getAllCashVoucherByCustomerID(params.id);
      }
    })
  }

  getAllCashVoucherByCustomerID(id: number) {
    this.webApiService.Get<Array<CashVoucher>>('Invoice/GetAllCashVoucherByCustomerID/?id=' + id, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._cashVouchers.clear();
        this._cashVouchers.addRows(response);
      }
    });
  }

  getAllInvoicesByCustomerID(id: number) {
    this.webApiService.Get<Array<Invoice>>('Invoice/GetAllInvoicesByCustomerID/?id=' + id, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._invoices.clear();
        this._invoices.addRows(response);
      }
    });
  }

  getCustomerStatement(id: number, dateRange: DateRange) {
    this.webApiService.Post<Array<CustomerStatement>>('Customer/GetCustomerStatement/?id=' + id, dateRange, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        response.forEach(x => { if (x.ID == -2147483648) x.ID = 0; })
        this._customerStatement.clear();
        this._customerStatement.addRows(response);
      }
    });
  }

  getCustomerByID(id: number) {
    this.webApiService.Get<Customer>('Customer/GetCustomerByID/?id=' + id, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._customer = response;
      }
    });
  }

  selectedCustomerStatementChanged(customerStatement: CustomerStatement) {
    if (customerStatement.ID !== 0)
      this._selectedCustomerStatement = customerStatement;
    else
      this._selectedCustomerStatement = undefined;
  }
  selectedInvoiceChanged(invoice: Invoice) {
    this._selectedInvoice = invoice;
  }
  selectedCashVoucherChanged(cashVoucher: CashVoucher) {
    this._selectedCashVoucher = cashVoucher;
  }

  print(id: string) {
    let printContents = document.getElementById(id).innerHTML;
    this.printService.print(printContents);
  }

}
