import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Job } from 'src/app/interfaces/job';
import { PrintJobsService } from 'src/app/services/print-jobs.service';
import { getLocalTimeDate, getLocalDay, getLocalTime } from 'src/app/utils/format-time';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'gpj-add-job-form',
  templateUrl: './add-job-form.component.html',
  styleUrls: ['./add-job-form.component.sass']
})
export class AddJobFormComponent implements OnInit, OnDestroy {
  private readonly activeFormsubject$ = new Subject();
  currentDayTimeFormatted: string = '';
  currentDay: string = '';
  currentTime: string = '';
  startDayToSubmit: string = '';

  addNewPrintJobForm = new FormGroup({
    createdBy: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    createdDate: new FormControl({value: '', disabled: true}),
    startDate: new FormGroup({
      startDay: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required])
    }), 
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
  translationsForSnackBar: any;
  ifLoading: boolean = false;

  constructor(
    private printJobsService: PrintJobsService,
    private _snackBar: MatSnackBar,
    private translateService: TranslateService
    ) {}

  ngOnInit(): void {
    this.setInitialFormState();
    this.translateService.get('NOTIFICATIONS')
      .pipe(takeUntil(this.activeFormsubject$))
      .subscribe(translations  => {
        this.translationsForSnackBar = translations;
    })
  }

  ngOnDestroy() {
    this.activeFormsubject$.next();
  }

  setInitialFormState() {
    const dateNow = new Date();
    this.currentDayTimeFormatted = getLocalTimeDate(dateNow);
    this.currentDay = getLocalDay(dateNow);
    this.currentTime = getLocalTime(dateNow);
    this.createdDate?.setValue(this.currentDayTimeFormatted);
  }

  onSubmit(formDirective: FormGroupDirective) {
    this.ifLoading = true;
    this.printJobsService
      .addNewPrintJob(this.prepareFormData())
      .pipe(takeUntil(this.activeFormsubject$))
      .subscribe(
        res => {
          formDirective.resetForm();
          this.addNewPrintJobForm.reset();
          this.ifLoading = false;
          this.setInitialFormState();
          this._snackBar.open(
            this.translationsForSnackBar.ON_SUCCESS_NEW_JOB_POST,
            this.translationsForSnackBar.ON_SUCCESS_DISMISS,
            {
              duration: 3000
            }
          );
        },
        err => {
          this.ifLoading = false;
          this._snackBar.open(
            this.translationsForSnackBar.ON_FAILED_POST,
            this.translationsForSnackBar.ON_FAIL_DISMISS,
            {
              duration: 3000
            }
          );
        }
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
    const preparedStartDate = `${this.startDayToSubmit}T${dataToBeSubmitted.startDate.startTime}`;
    dataToBeSubmitted.startDate = new Date(preparedStartDate);
    return dataToBeSubmitted;
  }

  get createdBy() {
    return this.addNewPrintJobForm.get('createdBy');
  }

  get createdDate() {
    return this.addNewPrintJobForm.get('createdDate');
  }

  get startDate() {
    return this.addNewPrintJobForm.get('startDate') as FormGroup;
  }

  get startDay() {
    return this.startDate?.get('startDay');
  }

  get startTime() {
    return this.startDate?.get('startTime');
  }

  get estimatedDuration() {
    return this.addNewPrintJobForm.get('estimatedDuration');
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

  getStartDay(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDayToSubmit = event.value ? getLocalDay(new Date(event.value)) : '';
  }
}
