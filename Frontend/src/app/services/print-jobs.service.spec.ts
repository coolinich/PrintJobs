import { TestBed } from '@angular/core/testing';

import { PrintJobsService } from './print-jobs.service';

describe('PrintJobsService', () => {
  let service: PrintJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
