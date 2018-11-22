import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { GridOptions, GridColumn, TextFilter, NumberFilter } from '../models.service';

@Component({
  selector: 'app-manage-fish',
  templateUrl: './manage-fish.component.html',
  styleUrls: ['./manage-fish.component.css']
})
export class ManageFishComponent implements OnInit {
  @ViewChild(GridComponent) _grid: GridComponent;
  _gridOptions: GridOptions;

  constructor() {
    this._gridOptions = {
      Columns: [
        new GridColumn('number', '#', 'number', true, new NumberFilter('', 'eq')),
        new GridColumn('name', 'Fish Name', 'string', true, new TextFilter('', 'eq'))
      ],
      Filterable: true,
      IsPaginated: true,
      PageSize: 20
    };
  }

  ngOnInit() {
    let rows: Array<any> = new Array<any>();
    rows.push({ number: 1, name: 'Bangda' });
    rows.push({ number: 2, name: 'Anjal' });
    this._grid.addRows(rows);
  }

}
