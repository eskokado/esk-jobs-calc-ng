export class Profile {
  constructor(
    public id: number,
    public name: string,
    public avatar: string,
    public monthly_budget: number,
    public days_per_week: number,
    public hours_per_day: number,
    public vacation_per_year: number,
    public value_hour: number
  ) {}
}
