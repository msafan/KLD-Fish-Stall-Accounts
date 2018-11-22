import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SaleItem {
  FishName: string;
  FK_ID_Fish: number;
  Quantity: number;
  Rate: number;
  Amount: number;
}

export class GridOptions {
  Columns: Array<GridColumn>;
  Filterable: boolean;
  IsPaginated: boolean;
  PageSize: number;
}

export class GridColumn {
  Name: string;
  Title: string;
  Type: string;
  Filter: GridFilter;
  Visible: boolean;

  constructor(name: string, title: string, type: string, visible: boolean, filter: GridFilter) {
    this.Name = name;
    this.Title = title;
    this.Type = type;
    this.Filter = filter;
    this.Visible = visible;
  }
}

export class GridFilter {
  Key: string;
  Option: string;

  constructor(key: string, option: string) {
    this.Key = key;
    this.Option = option;
  }
}

export class TextFilter extends GridFilter {
  constructor(key: string, option: string) {
    super(key, option);
  }
}

export class NumberFilter extends GridFilter {
  constructor(key: string, option: string) {
    super(key, option);
  }
}

export class DateFilter extends GridFilter {
  Date1: string;
  Date2: string;

  constructor(key: string, option: string, date1: string, date2: string) {
    super(key, option);

    this.Date1 = date1;
    this.Date2 = date2;
  }
}
