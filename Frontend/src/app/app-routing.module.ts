import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAllJobsComponent } from './components/pages/view-all-jobs/view-all-jobs.component';
import { AddNewJobComponent } from './components/pages/add-new-job/add-new-job.component';

const routes: Routes = [
  { path: 'all-jobs', component: ViewAllJobsComponent },
  { path: 'add-new-job', component: AddNewJobComponent },
  { path: '', redirectTo: 'all-jobs', pathMatch: 'full' },
  { path: '**', component: ViewAllJobsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
