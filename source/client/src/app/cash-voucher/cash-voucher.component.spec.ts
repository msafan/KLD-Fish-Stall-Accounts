import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashVoucherComponent } from './cash-voucher.component';

describe('CashVoucherComponent', () => {
  let component: CashVoucherComponent;
  let fixture: ComponentFixture<CashVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
