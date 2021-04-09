export interface Job {
  id: number;
  name: string;
  daily_hours: number;
  total_hours: number;
  created_at: number;
}

export interface saveJob {
  name: string;
  daily_hours: number;
  total_hours: number;
  created_at: number;
}
