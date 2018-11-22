import { Component, OnInit, Input } from '@angular/core';
import { GridColumn } from '../models.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() columns: Array<GridColumn>;

  constructor() { }

  ngOnInit() {
  }

}
