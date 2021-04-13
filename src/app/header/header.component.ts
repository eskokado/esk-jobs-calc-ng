import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../models/Profile';
import { ProfileService } from '../services/ProfileService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() profile: Profile;
  @Input() statusCount;
  @Input() freeHours;

  constructor() {}

  ngOnInit(): void {}
}
