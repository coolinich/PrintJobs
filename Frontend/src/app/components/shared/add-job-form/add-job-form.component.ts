import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PrintJobsService } from 'src/app/services/print-jobs.service';

@Component({
  selector: 'gpj-add-job-form',
  templateUrl: './add-job-form.component.html',
  styleUrls: ['./add-job-form.component.sass']
})
export class AddJobFormComponent implements OnInit {
  addNewPrintJob = new FormGroup({
    createdBy: new FormControl(''),
    createdDate: new FormControl(''),
    startDate: new FormControl(''),
    estimatedDuration: new FormControl(''),
    fileName: new FormControl(''),
    jobDescription: new FormControl(''),
    printerModel: new FormControl(''),
    printerType: new FormControl(''),
    jobStatus: new FormControl('')
  });

  constructor(private printJobsService: PrintJobsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.addNewPrintJob.value);
    this.printJobsService
      .addNewPrintJob(this.addNewPrintJob.value)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

  onCancel() {
    this.addNewPrintJob.reset();
  }
}
