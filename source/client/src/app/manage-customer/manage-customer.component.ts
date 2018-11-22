import { Component, OnInit, ViewChild } from '@angular/core';
import { GridColumn, NumberFilter, TextFilter, GridOptions } from '../models.service';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {
  @ViewChild(GridComponent) _grid: GridComponent;
  _gridOptions: GridOptions;

  constructor() {
    this._gridOptions = {
      Columns: [
        new GridColumn('number', '#', 'number', true, new NumberFilter('', 'eq')),
        new GridColumn('firstName', 'First Name', 'string', true, new TextFilter('', 'eq')),
        new GridColumn('lastName', 'Last Name', 'string', true, new TextFilter('', 'eq')),
        new GridColumn('email', 'Email ID', 'string', true, new TextFilter('', 'eq'))
      ],
      Filterable: true,
      IsPaginated: true,
      PageSize: 20
    };
  }

  ngOnInit() {
    let rows: Array<any> = new Array<any>();
    rows.push({ number: 1, firstName: 'Mohammed', lastName: 'Safan', email: 'mohammedsafan0@gmail.com' });
    rows.push({ number: 2, firstName: 'Safa', lastName: 'Mubashira', email: 'mubashirasafa@gmail.com' });
    this._grid.addRows(rows);
  }

}
