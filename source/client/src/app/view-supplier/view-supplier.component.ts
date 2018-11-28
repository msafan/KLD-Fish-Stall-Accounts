import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { GridComponent } from '../grid/grid.component';
import { Supplier, SupplierStatement, PurchaseInvoice, PaymentVoucher, GridOptions, DateFilter, NumberFilter, TextFilter, GridColumn, DateRange } from '../models/models.module';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { WebapiService } from '../webapi.service';
import { PrinterService } from '../printer.service';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.css']
})
export class ViewSupplierComponent extends BaseComponentModule {
  _supplier: Supplier;
  @ViewChild('supplierStatementTable') _supplierStatement: GridComponent;
  @ViewChild('paymentVouchersTable') _paymentVouchers: GridComponent;
  @ViewChild('invoicesTable') _invoices: GridComponent;

  _selectedSupplierStatement: SupplierStatement = undefined;
  _selectedPurchaseInvoice: PurchaseInvoice = undefined;
  _selectedPaymentVoucher: PaymentVoucher = undefined;
  _startDate: any;
  _endDate: any;

  _supplierStatementGridOptions: GridOptions = {
    Columns: [
      new GridColumn('Date', 'Date', 'date', true, new DateFilter('', 'eq', '', '')),
      new GridColumn('ID', '#', 'number', true, new NumberFilter('', 'eq')),
      new GridColumn('Particulars', 'Particulars', 'string', true, new TextFilter('', 'eq')),
      new GridColumn('Amount', 'Amount', 'number', true, new NumberFilter('', 'eq')),
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
  _paymentVouchersGridOptions: GridOptions = {
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
        this.getSupplierByID(params.id);
        this.getSupplierStatement(params.id, undefined);
        this.getAllPurchaseInvoicesBySupplierID(params.id);
        this.getAllPaymentVoucherBySupplierID(params.id);
      }
    })
  }

  getAllPaymentVoucherBySupplierID(id: number) {
    this.webApiService.Get<Array<PaymentVoucher>>('Purchase/GetAllPaymentVoucherBySupplierID/?id=' + id, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._paymentVouchers.clear();
        this._paymentVouchers.addRows(response);
      }
    });
  }

  getAllPurchaseInvoicesBySupplierID(id: number) {
    this.webApiService.Get<Array<PurchaseInvoice>>('Purchase/GetAllPurchaseInvoicesBySupplierID/?id=' + id, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._invoices.clear();
        this._invoices.addRows(response);
      }
    });
  }

  getSupplierStatement(id: number, dateRange: DateRange) {
    this.webApiService.Post<Array<SupplierStatement>>('Supplier/GetSupplierStatement/?id=' + id, dateRange, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        response.forEach(x => { if (x.ID == -2147483648) x.ID = 0; })
        this._supplierStatement.clear();
        this._supplierStatement.addRows(response);
      }
    });
  }

  getSupplierByID(id: number) {
    this.webApiService.Get<Supplier>('Supplier/GetSupplierByID/?id=' + id, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._supplier = response;
      }
    });
  }

  selectedSupplierStatementChanged(supplierStatement: SupplierStatement) {
    if (supplierStatement.ID !== 0)
      this._selectedSupplierStatement = supplierStatement;
    else
      this._selectedSupplierStatement = undefined;
  }
  selectedPurchaseInvoiceChanged(invoice: PurchaseInvoice) {
    this._selectedPurchaseInvoice = invoice;
  }
  selectedPaymentVoucherChanged(paymentVoucher: PaymentVoucher) {
    this._selectedPaymentVoucher = paymentVoucher;
  }

  print(id: string) {
    let printContents = document.getElementById(id).innerHTML;
    this.printService.print(printContents);
  }

  filter() {
    let startDate: Date = new Date(this._startDate.year, this._startDate.month - 1, this._startDate.day);
    let endDate: Date = new Date(this._endDate.year, this._endDate.month - 1, this._endDate.day);
    this.getSupplierStatement(this._supplier.ID, { StartDate: startDate, EndDate: endDate });
  }

  viewSupplierStatement() {
    if (this._selectedSupplierStatement.Particulars === 'Purchase Invoice')
      this.router.navigate(['/view-purchase-invoice', this._selectedSupplierStatement.ID]);
    else
      this.router.navigate(['/view-payment-voucher', this._selectedSupplierStatement.ID]);
  }

  viewPurchaseInvoice() {
    this.router.navigate(['/view-purchase-invoice', this._selectedPurchaseInvoice.ID]);
  }

  viewPaymentVoucher() {
    this.router.navigate(['/view-payment-voucher', this._selectedPaymentVoucher.ID]);
  }
}
