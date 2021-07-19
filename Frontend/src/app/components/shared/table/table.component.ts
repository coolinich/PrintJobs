import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/job';
import { PrintJobsService } from 'src/app/services/print-jobs.service';
import { PrintJobsDataSource } from 'src/app/utils/data-source';
import { JOBS } from 'src/assets/constants';

@Component({
  selector: 'gpj-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  dataSource!: PrintJobsDataSource;
  displayedColumns: string[] = [
    'createdBy',
    'jobDescription',
    'estimatedDuration',
    'fileName',
    'printerModel',
    'printerType',
    'startDate',
    'createdDate'
  ]; 
  constructor(private printJobsService: PrintJobsService) { }

  ngOnInit(): void {
    this.dataSource = new PrintJobsDataSource(this.printJobsService);
    this.dataSource.loadJobs();
  }
}
