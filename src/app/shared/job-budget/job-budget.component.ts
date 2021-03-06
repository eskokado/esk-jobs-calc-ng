import { Component, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { Job } from 'src/app/models/job';
import { Profile } from 'src/app/models/profile';
import JobUtils from '../../utils/JobUtils.js';

@Component({
  selector: 'app-job-budget',
  template: `
    <p *ngIf="!budget">Preencha os dados ao lado para ver o valor do projeto</p>
    <p *ngIf="budget">
      O valor do projeto ficou em <strong>R$ {{ budget }}</strong>
    </p>
  `,
  styles: [],
})
export class JobBudgetComponent implements DoCheck {
  @Input() job: Job;

  @Input() profile: Profile;

  budget: number;
  changeLog: string[] = [];

  @Output() budgetEvent = new EventEmitter<number>();

  ngDoCheck(): void {
    if (this.profile) {
      this.budget = JobUtils.calculateBudget(
        this.job,
        this.profile['value_hour']
      );
      this.budgetEvent.emit(this.budget);
    }
  }
}
