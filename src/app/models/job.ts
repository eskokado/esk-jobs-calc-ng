export class Job {
  constructor(
    public id: number,
    public name: string,
    public daily_hours: number,
    public total_hours: number,
    public created_at: number
  ) {}
}
