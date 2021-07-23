import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';
import { Job } from '../interfaces/job';

@Injectable({
  providedIn: 'root'
})
export class PrintJobsService {

  constructor(private http: HttpClient) { }

  getAllPrintJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${API_URL}/jobs`)
      .pipe(
        catchError(err => throwError(err))
      );
  }

  addNewPrintJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${API_URL}/job`, { job })
      .pipe(
        catchError(err => throwError(err))
      );
  }
}
