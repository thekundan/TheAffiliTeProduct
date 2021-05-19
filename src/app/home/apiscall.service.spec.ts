import { TestBed } from '@angular/core/testing';

import { ApiscallService } from './apiscall.service';

describe('ApiscallService', () => {
  let service: ApiscallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiscallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
