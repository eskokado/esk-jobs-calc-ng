import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    './profile.component.css',
    '/src/assets/styles/partials/forms.css',
    '/src/assets/styles/pages/profile.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
