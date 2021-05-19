import { TestBed } from '@angular/core/testing';

import { LimitContService } from './limit-cont.service';

describe('LimitContService', () => {
  let service: LimitContService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimitContService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
