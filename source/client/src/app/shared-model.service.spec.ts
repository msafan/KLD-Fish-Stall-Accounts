import { TestBed } from '@angular/core/testing';

import { SharedModelService } from './shared-model.service';

describe('SharedModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedModelService = TestBed.get(SharedModelService);
    expect(service).toBeTruthy();
  });
});
