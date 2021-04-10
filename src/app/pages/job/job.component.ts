import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}
}
