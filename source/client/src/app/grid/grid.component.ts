import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridColumn, GridOptions } from '../models/models.module';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input('options') _options: GridOptions;
  @Output('rowSelectionChanged') rowSelectionChanged: EventEmitter<any> = new EventEmitter<any>();
  _rows: Array<any> = new Array<any>();
  _selectedRow: any = undefined;

  constructor() {
  }

  ngOnInit() {
  }

  public addRows(rows: any[]) {
    rows.forEach(row => {
      this._rows.push(row);
    });
  }

  public clear() {
    this._rows = [];
  }

  public clearSelection() {
    this._selectedRow = undefined;
  }

  selectedRowChanged(row) {
    this._selectedRow = row;
    this.rowSelectionChanged.emit(this._selectedRow);
  }
}
