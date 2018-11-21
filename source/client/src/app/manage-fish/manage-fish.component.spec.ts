import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFishComponent } from './manage-fish.component';

describe('ManageFishComponent', () => {
  let component: ManageFishComponent;
  let fixture: ComponentFixture<ManageFishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
