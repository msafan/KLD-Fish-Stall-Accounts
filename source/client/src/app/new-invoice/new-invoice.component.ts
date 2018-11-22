import { Component, OnInit } from '@angular/core';
import { SaleItem } from '../models.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {
  _saleItems: Array<SaleItem>;
  _discount: number = 0;
  _grandTotal: number = 0;
  constructor() {
    this._saleItems = [
      { FK_ID_Fish: -1, Quantity: 0, Rate: 0, Amount: 0 }
    ]
  }

  ngOnInit() {
  }

  fishSelectionChanged(data) {
    if (this._saleItems[this._saleItems.length - 1].FK_ID_Fish != -1)
      this._saleItems.push({ FK_ID_Fish: -1, Quantity: 0, Rate: 0, Amount: 0 });
  }

  calculateTotal(item: SaleItem) {
    this._saleItems.
      filter(
        function (x) {
          if (x == item)
            return true;
        }).
      forEach(
        function (x) {
          x.Amount = x.Quantity * x.Rate;
        });
    this.calculateGrandTotal();
  }

  private calculateGrandTotal() {
    let total: number = 0;
    this._saleItems.
      filter(
        function (x) {
          if (x.FK_ID_Fish != -1)
            return true;
        }).
      forEach(
        function (x) {
          total = total + x.Amount;
        });

    this._grandTotal = total - this._discount;
  }

}
