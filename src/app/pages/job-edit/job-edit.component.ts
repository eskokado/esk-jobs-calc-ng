import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}
}
