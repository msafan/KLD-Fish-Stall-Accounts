import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCashVoucherComponent } from './new-cash-voucher.component';

describe('NewCashVoucherComponent', () => {
  let component: NewCashVoucherComponent;
  let fixture: ComponentFixture<NewCashVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCashVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCashVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
