import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';


import { HeaderComponent } from './components/shared/header/header.component';
import { TableComponent } from './components/shared/table/table.component';
import { AddJobFormComponent } from './components/shared/add-job-form/add-job-form.component';
import { ViewAllJobsComponent } from './components/pages/view-all-jobs/view-all-jobs.component';
import { AddNewJobComponent } from './components/pages/add-new-job/add-new-job.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    AddJobFormComponent,
    ViewAllJobsComponent,
    AddNewJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
