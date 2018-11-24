import { Component, OnInit, ViewChild } from '@angular/core';
import { Invoice, Customer, Fish, InvoiceItem } from '../models/models.module';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';
import { AutoCompleteTextBoxComponent } from '../auto-complete-text-box/auto-complete-text-box.component';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})

export class NewInvoiceComponent implements OnInit {
  _invoice: Invoice = {
    ID: -1,
    Balance: 0,
    Date: new Date(),
    Discount: 0,
    FK_ID_Customer: -1,
    Total: 0,
    InvoiceItems: [{ Amount: 0, ID: -1, FK_ID_Fish: -1, Quantity: 0, Rate: 0 }]
  };
  _customers: Array<Customer> = [];
  _customerNames: Array<string> = [];
  _selectedCustomer: Customer = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };

  _fishes: Array<Fish> = [];
  _fishNames: Array<string> = [];

  _canByPass: boolean = true;

  @ViewChild(AutoCompleteTextBoxComponent) _customerTextBox: AutoCompleteTextBoxComponent;

  constructor(private webApiService: WebapiService, private notifier: NotifierService) {
  }

  ngOnInit() {
    this.getAllCustomers();
    this.getAllFishes();
  }

  getAllFishes() {
    this.webApiService.Get<Array<Fish>>('Fish/GetAllFishes', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage);
      } else if (response) {
        this._fishes = response;
        this._fishNames = this._fishes.map((item) => item.Name);
      }
    });
  }

  getAllCustomers() {
    this.webApiService.Get<Array<Customer>>('Customer/GetAllCustomers', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage);
      } else if (response) {
        this._customers = response;
        this._customerNames = this._customers.map((item) => item.Name);
      }
    });
  }

  customerChanged(customerName: string) {
    this._selectedCustomer = this._customers.filter((item) => item.Name === customerName)[0];
    this._invoice.FK_ID_Customer = this._selectedCustomer.ID;
  }

  fishChanged(fishName: string, invoiceItem: InvoiceItem) {
    let fish = this._fishes.filter((item) => item.Name === fishName)[0];
    invoiceItem.FK_ID_Fish = fish.ID;
    if (this._invoice.InvoiceItems[this._invoice.InvoiceItems.length - 1].FK_ID_Fish !== -1) {
      this._invoice.InvoiceItems.push({ Amount: 0, FK_ID_Fish: -1, ID: -1, Quantity: 0, Rate: 0 });
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
          x.Amount = x.Quantity * x.Rate;
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
          total = total + x.Amount;
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
      InvoiceItems: [{ Amount: 0, ID: -1, FK_ID_Fish: -1, Quantity: 0, Rate: 0 }]
    };

    this._selectedCustomer = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };
    this._customerTextBox.clear();
    this._canByPass = true;
  }

  save() {
    this._canByPass = false;
    if (!this.isFormValid())
      return;

    if (this._invoice.ID !== -1) {
      //Edit
    } else {
      //Add
    }
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
      filter(x => x.ID !== -1).
      forEach(x => { if (x.Amount === 0) isValid = false; else validItemCount++; });

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
