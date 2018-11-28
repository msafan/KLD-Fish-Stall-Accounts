import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { Supplier, PurchaseInvoice, Fish, PurchaseInvoiceItem } from '../models/models.module';
import { AutoCompleteTextBoxComponent } from '../auto-complete-text-box/auto-complete-text-box.component';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-new-purchase-invoice',
  templateUrl: './new-purchase-invoice.component.html',
  styleUrls: ['./new-purchase-invoice.component.css']
})
export class NewPurchaseInvoiceComponent extends BaseComponentModule {
  _purchaseInvoice: PurchaseInvoice = {
    ID: -1,
    Balance: 0,
    Date: new Date(),
    Discount: 0,
    FK_ID_Supplier: -1,
    Total: 0,
    PurchaseInvoiceItems: [{ Total: 0, ID: -1, FK_ID_Fish: -1, Quantity: 0, Rate: 0, Fish: undefined }],
    Supplier: undefined
  };
  _suppliers: Array<Supplier> = [];
  _supplierNames: Array<string> = [];
  _selectedSupplier: Supplier = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };

  _fishes: Array<Fish> = [];
  _fishNames: Array<string> = [];

  _canByPass: boolean = true;
  _includeBalance: boolean = false;
  _isEditing: boolean = false;

  @ViewChild(AutoCompleteTextBoxComponent) _supplierTextBox: AutoCompleteTextBoxComponent;

  constructor(private webApiService: WebapiService, private notifier: NotifierService,
    router: Router, sharedModel: SharedModelService, private route: ActivatedRoute) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getAllSuppliers();
    this.getAllFishes();

    this.route.params.subscribe(params => {
      if (params.id) {
        this.getPurchaseInvoiceByID(params.id);
        this._isEditing = true;
      }
    });
  }

  getPurchaseInvoiceByID(ID: number) {
    this.webApiService.Get<PurchaseInvoice>('Purchase/GetPurchaseInvoiceByID/?id=' + ID, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        let date: Date = new Date(response.Date);
        this._purchaseInvoice = response;
        this._supplierTextBox.value = response.Supplier.Name;
        this._purchaseInvoice.Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        this._purchaseInvoice.PurchaseInvoiceItems.push({ Total: 0, ID: -1, FK_ID_Fish: -1, Quantity: 0, Rate: 0, Fish: undefined });
        this._includeBalance = this._purchaseInvoice.Balance !== 0;
        this._selectedSupplier = response.Supplier;
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

  getAllSuppliers() {
    this.webApiService.Get<Array<Supplier>>('Supplier/GetAllSuppliers', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._suppliers = response;
        this._supplierNames = this._suppliers.map((item) => item.Name);
      }
    });
  }

  supplierChanged(supplierName: string) {
    if (supplierName === '') {
      this._selectedSupplier = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };
      this._purchaseInvoice.FK_ID_Supplier = -1;
      return;
    }
    this._selectedSupplier = this._suppliers.filter((item) => item.Name === supplierName)[0];
    this._purchaseInvoice.FK_ID_Supplier = this._selectedSupplier.ID;
  }

  fishChanged(fishName: string, invoiceItem: PurchaseInvoiceItem) {
    if (fishName === '') {
      invoiceItem.FK_ID_Fish = -1;
      return;
    }
    let fish = this._fishes.filter((item) => item.Name === fishName)[0];
    invoiceItem.FK_ID_Fish = fish.ID;
    if (this._purchaseInvoice.PurchaseInvoiceItems[this._purchaseInvoice.PurchaseInvoiceItems.length - 1].FK_ID_Fish !== -1) {
      this._purchaseInvoice.PurchaseInvoiceItems.push({ Total: 0, FK_ID_Fish: -1, ID: -1, Quantity: 0, Rate: 0, Fish: undefined });
    }
  }

  calculateTotal(invoiceItem: PurchaseInvoiceItem) {
    this._purchaseInvoice.PurchaseInvoiceItems.
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
    this._purchaseInvoice.PurchaseInvoiceItems.
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

    this._purchaseInvoice.Total = total - this._purchaseInvoice.Discount;
  }

  cancel() {
    this._purchaseInvoice = {
      ID: -1,
      Balance: 0,
      Date: new Date(),
      Discount: 0,
      FK_ID_Supplier: -1,
      Total: 0,
      PurchaseInvoiceItems: [{ Total: 0, ID: -1, FK_ID_Fish: -1, Quantity: 0, Rate: 0, Fish: undefined }],
      Supplier: undefined
    };

    this._selectedSupplier = { ID: -1, Address: '', Balance: 0, Name: '', PhoneNumber: '' };
    this._supplierTextBox.clear();
    this._canByPass = true;

    this.getAllSuppliers();
    this.getAllFishes();

    if (this._isEditing) {
      this.router.navigate(['/list-purchase-invoice']);
    }
  }

  save() {
    this._canByPass = false;
    if (this._includeBalance) {
      this._purchaseInvoice.Balance = this._selectedSupplier.Balance;
    }

    if (!this.isFormValid()) {
      return;
    }

    this._purchaseInvoice.Supplier = undefined;
    this._purchaseInvoice.PurchaseInvoiceItems = this._purchaseInvoice.PurchaseInvoiceItems.filter(x => x.FK_ID_Fish !== -1).map(x => {
      return { Total: x.Total, ID: x.ID, FK_ID_Fish: x.FK_ID_Fish, Quantity: x.Quantity, Rate: x.Rate, Fish: undefined };
    });

    if (this._purchaseInvoice.ID !== -1) {
      this.webApiService.Post<PurchaseInvoice>('Purchase/EditPurchaseInvoice', this._purchaseInvoice, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.notifier.notify('success', 'Invoice #' + response.ID + ' updated successfully');
          this.cancel();
          return;
        }
      });
    } else {
      this.webApiService.Post<PurchaseInvoice>('Purchase/AddPurchaseInvoice', this._purchaseInvoice, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.notifier.notify('success', 'Invoice #' + response.ID + ' added successfully');
          this.cancel();
          return;
        }
      });
    }

    this._purchaseInvoice.PurchaseInvoiceItems.push({ Total: 0, FK_ID_Fish: -1, ID: -1, Quantity: 0, Rate: 0, Fish: undefined });
  }

  isFormValid() {
    if (!this.isSupplierValid())
      return false;

    if (!this.isPurchaseInvoiceItemsValid())
      return false;

    return true;
  }

  isPurchaseInvoiceItemsValid() {
    if (this._canByPass)
      return true;

    let isValid: boolean = true;
    let validItemCount: number = 0;
    this._purchaseInvoice.PurchaseInvoiceItems.
      filter(x => x.FK_ID_Fish !== -1).
      forEach(x => { if (!x.Total) isValid = false; else validItemCount++; });

    if (!isValid)
      return false;

    if (validItemCount <= 0)
      return false;

    return true;
  }

  isSupplierValid() {
    if (this._canByPass)
      return true;

    if (this._purchaseInvoice.FK_ID_Supplier === -1)
      return false;

    return true;
  }
}
