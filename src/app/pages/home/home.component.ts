import { Component, OnInit, ViewEncapsulation, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobService } from 'src/app/services/JobService';

import JobUtils from '../../utils/JobUtils.js';
import { Profile } from './../../models/profile';
import { ProfileService } from 'src/app/services/ProfileService';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '/src/assets/styles/partials/modal.css',
    '/src/assets/styles/pages/index.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  jobs = [];
  @Output() job = {};
  @Output() profile: Profile;

  @Output() statusCount = {
    progress: 0,
    done: 0,
    total: 0,
  };

  @Output() freeHours = 0;

  jobTotalHours = 0;

  constructor(
    private jobService: JobService,
    private profileService: ProfileService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.displayProfile();
    this.displayJobs();
  }

  displayJobs() {
    this.jobService.listJobs().subscribe((data) => {
      this.jobs = data.map((job) => {
        const remaining = JobUtils.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';

        this.jobTotalHours += status === 'progress' ? job.daily_hours : 0;

        this.statusCount[status] += 1;

        return {
          ...job,
          remaining,
          status,
          budget: JobUtils.calculateBudget(job, this.profile.value_hour),
        };
      });
      (this.statusCount.total = this.jobs.length), console.log(this.jobs);
      this.freeHours = this.profile.hours_per_day - this.jobTotalHours;
    });
  }

  displayProfile() {
    this.profileService.listProfiles().subscribe((data) => {
      this.profile = data[0];
      console.log(this.profile);
    });
  }

  Edit(id: number) {
    console.log('editing', id);
    this.jobService.getJob(id).subscribe((data) => {
      console.log(data);
      const remaining = JobUtils.remainingDays(data);
      this.job = {
        ...data,
        remaining,
        status,
        budget: JobUtils.calculateBudget(data, this.profile.value_hour),
      };
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
        this.jobService.deleteJob(id).subscribe(() => {
          this.displayJobs();
        });
      }
    });
  }
}
