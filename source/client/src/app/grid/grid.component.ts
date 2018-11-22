import { Component, OnInit, Input } from '@angular/core';
import { GridColumn, GridOptions } from '../models.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input('options') _options: GridOptions;
  _rows: Array<any>;

  constructor() {
    this._rows = new Array<any>();
  }

  ngOnInit() {
  }

  public addRows(rows: any[]) {
    rows.forEach(row => {
      this._rows.push(row);
    });
  }
}
