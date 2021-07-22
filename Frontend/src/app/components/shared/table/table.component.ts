import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Job } from 'src/app/interfaces/job';
import { PrintJobsService } from 'src/app/services/print-jobs.service';
import { PrintJobsDataSource } from 'src/app/utils/data-source';
import { JOBS } from 'src/assets/constants';

@Component({
  selector: 'gpj-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit, OnDestroy {
  private readonly activeTableSubject$ = new Subject;
  dataSource!: PrintJobsDataSource;
  ifLoading: boolean = true;
  displayedColumns: string[] = [
    'jobDescription',
    'fileName',
    'printerModel',
    'printerType',
    'createdBy',
    'estimatedDuration',
    'startDate',
    'createdDate'
  ];
  constructor(private printJobsService: PrintJobsService) { }

  ngOnInit(): void {
    this.dataSource = new PrintJobsDataSource(this.printJobsService);
    this.dataSource.loadJobs();
    this.dataSource.loading$
      .pipe(
        takeUntil(this.activeTableSubject$)
      )
      .subscribe(
        (statusOfLoadingData) => this.ifLoading = statusOfLoadingData
      )
  }

  ngOnDestroy(): void {
    this.activeTableSubject$.next();
  }
}
