import {
  Component,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/ProfileService';
import { convertCompilerOptionsFromJson } from 'typescript';

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
  profile: Profile;
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.displayProfile();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.profile.name);
  }

  displayProfile() {
    this.profileService.listProfiles().subscribe((data) => {
      this.profile = data[0];
      console.log(this.profile);
    });
  }

  saveProfile() {
    let myprofile = this.profile;
    const id = this.profile.id;
    // definir quantas semanas tem num ano
    const weeksPerYear = 52;
    // remover as semanas de férias do ano, para pegar quantas semanas tem um mês
    const weeksPerMonth = (weeksPerYear - myprofile.vacation_per_year) / 12;
    // total de horas trabalhadas na semana
    const weekTotalHours = myprofile.hours_per_day * myprofile.days_per_week;
    // horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;
    // qual o valor da minha hora ?
    const valueHour = +(myprofile.monthly_budget / monthlyTotalHours).toFixed(
      2
    );

    myprofile = {
      ...myprofile,
      value_hour: valueHour,
    };

    delete myprofile.id;
    this.profileService.updateProfile(id, myprofile).subscribe((data) => {
      console.log(data);
      this.displayProfile();
    });
  }
}
