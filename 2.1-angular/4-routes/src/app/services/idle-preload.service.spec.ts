import { TestBed } from '@angular/core/testing';

import { IdlePreloadService } from './idle-preload.service';

describe('IdlePreloadService', () => {
  let service: IdlePreloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdlePreloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
