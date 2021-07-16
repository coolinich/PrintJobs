import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from 'rxjs/operators';
import { Job } from "../interfaces/job";
import { PrintJobsService } from "../services/print-jobs.service";

export class PrintJobsDataSource implements DataSource<Job> {
    private jobsSubject = new BehaviorSubject<Job[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private printJobsService: PrintJobsService) {}

    connect(collectionViewer: CollectionViewer): Observable<Job[]> {
        return this.jobsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.jobsSubject.complete();
        this.loadingSubject.complete();
    }

    loadJobs() {
        this.loadingSubject.next(true);
        this.printJobsService.getAllPrintJobs()
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((jobs: Job[]) => this.jobsSubject.next(jobs));  
    }
}
