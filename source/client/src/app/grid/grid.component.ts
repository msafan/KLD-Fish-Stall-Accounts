import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridColumn, GridOptions } from '../models/models.module';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [DatePipe]
})
export class GridComponent implements OnInit {
  @Input('options') _options: GridOptions;
  @Output() rowSelectionChanged: EventEmitter<any> = new EventEmitter<any>();
  _rows: Array<any> = new Array<any>();
  _rowsToDisplay: Array<any> = new Array<any>();
  _selectedRow: any = undefined;

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit() {
  }

  public addRows(rows: any[]) {
    rows.forEach(row => {
      this._rows.push(row);
    });
    this._rowsToDisplay = this._rows.filter(x => true);
    this.applyFilter();
  }

  public clear() {
    this._rows = [];
    this._rowsToDisplay = this._rows.filter(x => true);
  }

  public clearSelection() {
    this._selectedRow = undefined;
  }

  selectedRowChanged(row) {
    this._selectedRow = row;
    this.rowSelectionChanged.emit(this._selectedRow);
  }

  searchChanged() {
    this.applyFilter();
  }

  applyFilter() {
    this._rowsToDisplay = this._rows.filter(x => true);
    if (this._options) {
      this._options.Columns.forEach(column => {
        const columnName = column.Name;
        const key = column.Filter.Key ? column.Filter.Key.toLowerCase() : '';
        this._rowsToDisplay = this._rowsToDisplay.filter(item => {
          let value = item[columnName] !== undefined ? item[columnName].toString().toLowerCase() : undefined;
          if (value == undefined && column.Type === 'number')
            value = '0';

          if (column.Type === 'date') {
            value = this.datePipe.transform(value).toLowerCase();
          }
          return value.indexOf(key) !== -1;
        });
      });
    }
  }
}
