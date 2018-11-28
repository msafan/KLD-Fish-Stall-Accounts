import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class Fish {
  ID: number;
  Name: string;
}

export class Customer {
  ID: number;
  Name: string;
  Address: string;
  PhoneNumber: string;
  Balance: number;
}

export class CashVoucher {
  ID: number;
  FK_ID_Customer: number;
  Date: Date;
  Amount: number;
  Remarks: string;
  Customer: Customer;
}

export class Invoice {
  ID: number;
  Date: Date;
  FK_ID_Customer: number;
  Discount: number;
  Total: number;
  Balance: number;
  InvoiceItems: Array<InvoiceItem>;
  Customer: Customer;
}

export class InvoiceItem {
  ID: number;
  FK_ID_Fish: number;
  Quantity: number;
  Rate: number;
  Total: number;
  Fish: Fish;
}

export class DateRange {
  StartDate: Date;
  EndDate: Date;
}

export class WebApiError {
  Message: string;
  ExceptionMessage: string;
  ExceptionType: string;
  StackTrace: string
}

export class CustomerStatement {
  Date: Date;
  Particulars: string;
  ID: number;
  Amount: number;
  Balance: number;
}

export class User {
  ID: number;
  Name: string;
  UserID: string;
  Password: string;
}

export class AuthenticatedUser {
  Name: string;
  UserID: string;
  Token: string;
}

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
