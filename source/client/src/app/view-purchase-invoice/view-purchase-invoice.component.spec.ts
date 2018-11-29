import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseInvoiceComponent } from './view-purchase-invoice.component';

describe('ViewPurchaseInvoiceComponent', () => {
  let component: ViewPurchaseInvoiceComponent;
  let fixture: ComponentFixture<ViewPurchaseInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPurchaseInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPurchaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
