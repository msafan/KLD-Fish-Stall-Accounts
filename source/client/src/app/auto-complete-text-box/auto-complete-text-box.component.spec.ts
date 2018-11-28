import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteTextBoxComponent } from './auto-complete-text-box.component';

describe('AutoCompleteTextBoxComponent', () => {
  let component: AutoCompleteTextBoxComponent;
  let fixture: ComponentFixture<AutoCompleteTextBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteTextBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
