import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/models/job.js';
import { Profile } from 'src/app/models/profile';
import { JobService } from 'src/app/services/JobService';
import { ProfileService } from 'src/app/services/ProfileService.js';
import JobUtils from '../../utils/JobUtils.js';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: [
    './job-edit.component.css',
    '/src/assets/styles/partials/forms.css',
    '/src/assets/styles/partials/modal.css',
    '/src/assets/styles/pages/job.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class JobEditComponent implements OnInit {
  jobId;
  job: Job;
  profile: Profile;
  budget = 0.0;
  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private profileService: ProfileService
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
      this.budget = JobUtils.calculateBudget(data, this.profile.value_hour);
    });
  }

  updateJob() {
    const id = this.job.id;
    const myjob = this.job;
    delete myjob.id;
    console.log('this is being edited', myjob);
    this.jobService.updateJob(id, myjob).subscribe((data) => {
      console.log(data);
      this.job = data;
      this.budget = JobUtils.calculateBudget(data, this.profile.value_hour);
    });
  }
}
