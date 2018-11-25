import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCashVoucherComponent } from './view-cash-voucher.component';

describe('ViewCashVoucherComponent', () => {
  let component: ViewCashVoucherComponent;
  let fixture: ComponentFixture<ViewCashVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCashVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCashVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
