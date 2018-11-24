import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCashVoucherComponent } from './list-cash-voucher.component';

describe('ListCashVoucherComponent', () => {
  let component: ListCashVoucherComponent;
  let fixture: ComponentFixture<ListCashVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCashVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCashVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
