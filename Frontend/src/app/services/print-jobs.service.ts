import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Job } from '../interfaces/job';

@Injectable({
  providedIn: 'root'
})
export class PrintJobsService {

  constructor(private http: HttpClient) { }

  getAllPrintJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('http://localhost:3001/jobs');
  }

  addNewPrintJob(job: Job): Observable<Job> {
    return this.http.post<Job>('http://localhost:3001/job', { job })
      .pipe(
        catchError((err) => throwError(err?.message))
      )
  }
}
