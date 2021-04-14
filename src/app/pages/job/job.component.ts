import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/models/job';
import { Profile } from 'src/app/resources/profiles';
import { JobService } from 'src/app/services/JobService';
import { ProfileService } from 'src/app/services/ProfileService';
import { JobBudgetComponent } from 'src/app/shared/job-budget/job-budget.component.js';
import JobUtils from '../../utils/JobUtils.js';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: [
    './job.component.css',
    '/src/assets/styles/partials/forms.css',
    '/src/assets/styles/pages/job.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class JobComponent implements OnInit {
  job: Job;
  profile: Profile;
  budget = 0.0;

  @ViewChild(JobBudgetComponent) childView: JobBudgetComponent;

  constructor(
    private jobService: JobService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.listProfiles().subscribe((data) => {
      this.profile = data[0];
    });
    this.job = new Job(null, '', 0, 0, new Date().getTime());
  }

  setBudget(value: number) {
    this.budget = value;
  }

  createJob() {
    const myjob = this.job;
    delete myjob.id;
    this.jobService.createJob(myjob).subscribe((data) => {
      console.log(data);
      this.job = data;
      // this.budget = JobUtils.calculateBudget(data, this.profile.value_hour);
      this.router.navigate(['/']);
    });
  }
}
