import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleItem } from '../models.service';
import { FormControl } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

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
      { FK_ID_Fish: -1, Quantity: 0, Rate: 0, Amount: 0, FishName: '' }
    ]
  }

  ngOnInit() {
  }

  fishChanged(item: SaleItem) {
    item.FK_ID_Fish = states.indexOf(item.FishName);
    if (this._saleItems[this._saleItems.length - 1].FK_ID_Fish != -1)
      this._saleItems.push({ FK_ID_Fish: -1, Quantity: 0, Rate: 0, Amount: 0, FishName: '' });
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

  calculateGrandTotal() {
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
