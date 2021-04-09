export interface Profile {
  id: number;
  name: string;
  avatar: string;
  monthly_budget: number;
  days_per_week: number;
  hours_per_day: number;
  vacation_per_year: number;
  value_hour: number;
}

export interface saveProfile {
  name: string;
  avatar: string;
  monthly_budget: number;
  days_per_week: number;
  hours_per_day: number;
  vacation_per_year: number;
  value_hour: number;
}
