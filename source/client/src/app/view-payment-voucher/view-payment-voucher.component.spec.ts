import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymentVoucherComponent } from './view-payment-voucher.component';

describe('ViewPaymentVoucherComponent', () => {
  let component: ViewPaymentVoucherComponent;
  let fixture: ComponentFixture<ViewPaymentVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPaymentVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPaymentVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
