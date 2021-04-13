import { Profile } from './../../models/profile';
import { Component, OnInit, ViewEncapsulation, Output } from '@angular/core';
import { JobService } from 'src/app/services/JobService';

import JobUtils from '../../utils/JobUtils.js';
import { ProfileService } from 'src/app/services/ProfileService';

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
    private profileService: ProfileService
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
}
