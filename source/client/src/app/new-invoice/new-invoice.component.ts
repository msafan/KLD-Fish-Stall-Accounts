import { Component, OnInit, ViewChild } from '@angular/core';
import { Invoice, Customer, Fish, InvoiceItem } from '../models/models.module';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';
import { AutoCompleteTextBoxComponent } from '../auto-complete-text-box/auto-complete-text-box.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponentModule } from '../base-component/base-component.module';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})

export class NewInvoiceComponent extends BaseComponentModule {
  _invoice: Invoice = {
    ID: -1,
    Balance: 0,
    Date: new Date(),
    Discount: 0,
    FK_ID_Customer: -1,
    Total: 0,
    InvoiceItems: [{ Total: 0, ID: -1, FK_ID_Fish: -1, Quantity: 0, Rate: 0 }],
    Customer: undefined
  };
  _customers: Array<Customer> = [];
  _customerNames: Array<string> = [];
  _selectedCustomer: Customer = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };

  _fishes: Array<Fish> = [];
  _fishNames: Array<string> = [];

  _canByPass: boolean = true;
  _includeBalance: boolean = false;
  _isEditing: boolean = false;

  @ViewChild(AutoCompleteTextBoxComponent) _customerTextBox: AutoCompleteTextBoxComponent;

  constructor(private webApiService: WebapiService, private notifier: NotifierService,
    router: Router, sharedModel: SharedModelService, private route: ActivatedRoute) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getAllCustomers();
    this.getAllFishes();

    this.route.params.subscribe(params => {
      if (params.id) {
        this.getInvoiceByID(params.id);
        this._isEditing = true;
      }
    })
  }

  getInvoiceByID(ID: number) {
    this.webApiService.Get<Invoice>('Invoice/GetInvoiceByID/?id=' + ID, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        let date: Date = new Date(response.Date);
        this._invoice = response;
        this._invoice.InvoiceItems = response.InvoiceItems.map(x => {
          return { Total: x.Total, ID: x.ID, FK_ID_Fish: x.FK_ID_Fish, Quantity: x.Quantity, Rate: x.Rate }
        });
        this._invoice.Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      }
    });
  }

  getAllFishes() {
    this.webApiService.Get<Array<Fish>>('Fish/GetAllFishes', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._fishes = response;
        this._fishNames = this._fishes.map((item) => item.Name);
      }
    });
  }

  getAllCustomers() {
    this.webApiService.Get<Array<Customer>>('Customer/GetAllCustomers', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._customers = response;
        this._customerNames = this._customers.map((item) => item.Name);
      }
    });
  }

  customerChanged(customerName: string) {
    if (customerName === '') {
      this._selectedCustomer = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };
      this._invoice.FK_ID_Customer = -1;
      return;
    }
    this._selectedCustomer = this._customers.filter((item) => item.Name === customerName)[0];
    this._invoice.FK_ID_Customer = this._selectedCustomer.ID;
  }

  fishChanged(fishName: string, invoiceItem: InvoiceItem) {
    if (fishName === '') {
      invoiceItem.FK_ID_Fish = -1;
      return;
    }
    let fish = this._fishes.filter((item) => item.Name === fishName)[0];
    invoiceItem.FK_ID_Fish = fish.ID;
    if (this._invoice.InvoiceItems[this._invoice.InvoiceItems.length - 1].FK_ID_Fish !== -1) {
      this._invoice.InvoiceItems.push({ Total: 0, FK_ID_Fish: -1, ID: -1, Quantity: 0, Rate: 0 });
    }
  }

  calculateTotal(invoiceItem: InvoiceItem) {
    this._invoice.InvoiceItems.
      filter(
        function (x) {
          if (x === invoiceItem) {
            return true;
          }
        }).
      forEach(
        function (x) {
          x.Total = x.Quantity * x.Rate;
        });
    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    let total = 0;
    this._invoice.InvoiceItems.
      filter(
        function (x) {
          if (x.FK_ID_Fish !== -1) {
            return true;
          }
        }).
      forEach(
        function (x) {
          total = total + x.Total;
        });

    this._invoice.Total = total - this._invoice.Discount;
  }

  cancel() {
    this._invoice = {
      ID: -1,
      Balance: 0,
      Date: new Date(),
      Discount: 0,
      FK_ID_Customer: -1,
      Total: 0,
      InvoiceItems: [{ Total: 0, ID: -1, FK_ID_Fish: -1, Quantity: 0, Rate: 0 }],
      Customer: undefined
    };

    this._selectedCustomer = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };
    this._customerTextBox.clear();
    this._canByPass = true;

    this.getAllCustomers();
    this.getAllFishes();

    if (this._isEditing)
      this.router.navigate(['/list-invoice']);
  }

  save() {
    this._canByPass = false;
    if (this._includeBalance)
      this._invoice.Balance = this._selectedCustomer.Balance;

    if (!this.isFormValid())
      return;

    this._invoice.InvoiceItems = this._invoice.InvoiceItems.filter(x => x.FK_ID_Fish !== -1);

    if (this._invoice.ID !== -1) {
      this.webApiService.Post<Invoice>('Invoice/EditInvoice', this._invoice, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.notifier.notify('success', 'Invoice #' + response.ID + ' updated successfully');
          this.cancel();
          return;
        }
      });
    } else {
      this.webApiService.Post<Invoice>('Invoice/AddInvoice', this._invoice, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.notifier.notify('success', 'Invoice #' + response.ID + ' added successfully');
          this.cancel();
          return;
        }
      });
    }

    this._invoice.InvoiceItems.push({ Total: 0, FK_ID_Fish: -1, ID: -1, Quantity: 0, Rate: 0 });
  }

  isFormValid() {
    if (!this.isCustomerValid())
      return false;

    if (!this.isInvoiceItemsValid())
      return false;

    return true;
  }

  isInvoiceItemsValid() {
    if (this._canByPass)
      return true;

    let isValid: boolean = true;
    let validItemCount: number = 0;
    this._invoice.InvoiceItems.
      filter(x => x.FK_ID_Fish !== -1).
      forEach(x => { if (!x.Total) isValid = false; else validItemCount++; });

    if (!isValid)
      return false;

    if (validItemCount <= 0)
      return false;

    return true;
  }

  isCustomerValid() {
    if (this._canByPass)
      return true;

    if (this._invoice.FK_ID_Customer === -1)
      return false;

    return true;
  }

}
