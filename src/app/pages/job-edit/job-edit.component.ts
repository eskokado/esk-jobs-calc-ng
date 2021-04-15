import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Job } from 'src/app/models/job.js';
import { Profile } from 'src/app/models/profile';
import { JobService } from 'src/app/services/JobService';
import { ProfileService } from 'src/app/services/ProfileService.js';
import { JobBudgetComponent } from 'src/app/shared/job-budget/job-budget.component.js';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: [
    './job-edit.component.css',
    '/src/assets/styles/partials/forms.css',
    '/src/assets/styles/pages/job.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class JobEditComponent implements OnInit {
  jobId;

  job: Job;

  profile: Profile;
  budget = 0.0;

  @ViewChild(JobBudgetComponent) childView: JobBudgetComponent;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private profileService: ProfileService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.profileService.listProfiles().subscribe((data) => {
      this.profile = data[0];
    });
    this.route.paramMap.subscribe((params) => {
      this.jobId = params.get('id');
    });
    this.jobService.getJob(this.jobId).subscribe((data) => {
      console.log(data);
      this.job = data;
    });
  }

  setBudget(value: number) {
    this.budget = value;
  }

  updateJob() {
    const id = this.job.id;
    const myjob = this.job;
    delete myjob.id;
    console.log('this is being edited', myjob);
    this.jobService.updateJob(id, myjob).subscribe((data) => {
      console.log(data);
      this.job = data;
    });
  }

  remove(id: number) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirme remover projeto',
        message: 'Quer mesmo excluir esse job? Ele será apagado para sempre.',
      },
    });
    confirmDialog.afterClosed().subscribe((action) => {
      if (action === true) {
        this.jobService.deleteJob(id).subscribe();
      }
    });
  }
}
