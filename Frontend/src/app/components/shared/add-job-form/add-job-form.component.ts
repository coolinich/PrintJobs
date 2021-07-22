import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Job } from 'src/app/interfaces/job';
import { PrintJobsService } from 'src/app/services/print-jobs.service';
import { formatTimeToDateTimeLocal } from 'src/app/utils/format-time';

@Component({
  selector: 'gpj-add-job-form',
  templateUrl: './add-job-form.component.html',
  styleUrls: ['./add-job-form.component.sass']
})
export class AddJobFormComponent implements OnInit, OnDestroy {
  private readonly activeFormsubject$ = new Subject();
  currentTimeFormatted = formatTimeToDateTimeLocal(new Date()); 
  addNewPrintJobForm = new FormGroup({
    createdBy: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    createdDate: new FormControl({value: '', disabled: true}),
    startDate: new FormControl(''),
    estimatedDuration: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    fileName: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.pattern('^([-a-zA-Z0-9\/\s_\\(\):])+(\.[a-zA-Z0-9]+)?$')
    ]),
    jobDescription: new FormControl('', [Validators.required, Validators.maxLength(450)]),
    printerModel: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    printerType: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    jobStatus: new FormControl('')
  });

  constructor(private printJobsService: PrintJobsService) { 
  }

  ngOnInit(): void {
    this.setInitialFormState();
  }

  ngOnDestroy() {
    this.activeFormsubject$.next();
  }

  setInitialFormState() {
    this.currentTimeFormatted = formatTimeToDateTimeLocal(new Date());
    this.createdDate?.setValue(this.currentTimeFormatted);
  }

  onSubmit(formDirective: FormGroupDirective) {
    this.printJobsService
      .addNewPrintJob(this.prepareFormData())
      .pipe(takeUntil(this.activeFormsubject$))
      .subscribe(
        res => {
          formDirective.resetForm();
          this.addNewPrintJobForm.reset();
          this.setInitialFormState();
        },
        err => console.log(err)
      )
  }

  onCancel(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.addNewPrintJobForm.reset();
    this.setInitialFormState();
  }

  prepareFormData(): Job {
    let dataToBeSubmitted = this.addNewPrintJobForm.getRawValue();
    dataToBeSubmitted.createdDate = new Date(dataToBeSubmitted.createdDate);
    dataToBeSubmitted.startDate = new Date(dataToBeSubmitted.startDate);
    return dataToBeSubmitted;
  }

  get createdBy() {
    return this.addNewPrintJobForm.get('createdBy');
  }

  get createdDate() {
    return this.addNewPrintJobForm.get('createdDate');
  }

  get fileName() {
    return this.addNewPrintJobForm.get('fileName');
  }

  get jobDescription() {
    return this.addNewPrintJobForm.get('jobDescription');
  }

  get printerModel() {
    return this.addNewPrintJobForm.get('printerModel');
  }

  get printerType() {
    return this.addNewPrintJobForm.get('printerType');
  }
}
