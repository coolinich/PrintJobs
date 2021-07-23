import { TestBed } from '@angular/core/testing';

import { PrintJobsService } from './print-jobs.service';
import { Job } from '../interfaces/job';
import { defer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('PrintJobsService', () => {
  let printJobsService: PrintJobsService;
  let httpClientSpy: {
    get: jasmine.Spy,
    post: jasmine.Spy
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    printJobsService = new PrintJobsService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(printJobsService).toBeTruthy();
  });

  it('returns expected Print Jobs', (done: DoneFn) => {
    const currentDate = new Date();
    const expectedPrintJobs: Job[] = [
      {
        "id": "1",
        "createdBy": "Mocked author",
        "createdDate": currentDate.toString(),
        "startDate": currentDate.toString(),
        "estimatedDuration": "1",
        "fileName": "Mocked_file_name",
        "jobDescription": "Mocked_file_description",
        "printerModel": "Mocked_printer_model",
        "printerType": "Mocked_printer_type",
        "jobStatus": "mocked_status"
      }
    ];
    
    httpClientSpy.get.and.returnValue(asyncData(expectedPrintJobs));

    printJobsService.getAllPrintJobs().subscribe(
      (jobs: Job[]) => {
        expect(jobs).toEqual(expectedPrintJobs, 'expected Print Jobs');
        done();
      },
      done.fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call')
  });

  it('returns an error when server returns 500 error', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: '500 error',
      status: 500,
      statusText: 'Server error'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    printJobsService.getAllPrintJobs().subscribe(
      response => {
        done.fail('error is expected');
      },
      error => {
        expect(error.error).toContain(errorResponse.error);
        expect(error.status).toBe(errorResponse.status);
        done();
      }
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call')
  });

});


function asyncData<Job>(data: Job[] | Job) {
  return defer(() => Promise.resolve(data));
}

function asyncError<HttpErrorResponse>(error: HttpErrorResponse) {
  return defer(() => Promise.reject(error));
}

