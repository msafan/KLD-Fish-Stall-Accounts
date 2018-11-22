import { Component, OnInit } from '@angular/core';
import { GridColumn, NumberFilter, TextFilter } from '../models.service';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {

  columns: Array<GridColumn>;
  constructor() {
    this.columns = new Array<GridColumn>();
    this.columns.push(new GridColumn('number', '#', 'number', new NumberFilter('', 'eq')));
    this.columns.push(new GridColumn('firstName', 'First Name', 'string', new TextFilter('', 'eq')));
    this.columns.push(new GridColumn('lastName', 'Last Name', 'string', new TextFilter('', 'eq')));
    this.columns.push(new GridColumn('email', 'Email ID', 'string', new TextFilter('', 'eq')));
  }

  ngOnInit() {
  }

}
