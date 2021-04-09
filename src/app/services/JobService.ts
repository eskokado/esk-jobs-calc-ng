import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveJob, Job } from '../resources/jobs';
import { Observable } from 'rxjs';

@Injectable()
export class JobService {
  private jobsUrl = 'http://localhost:3000/api/v1/jobs';
  private headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    Accepts: 'application/json',
    'Content-Type': 'application/json',
  });

  public constructor(private http: HttpClient) {}

  listJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobsUrl);
  }

  getJob(jobId: string) {
    return this.http.get<Job>(`${this.jobsUrl}/${jobId}`);
  }

  insertJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.jobsUrl, job);
  }

  updateJob(id: number, job: saveJob): Observable<Job> {
    const url = `${this.jobsUrl}/${id}`;
    return this.http.put<Job>(url, JSON.stringify(job));
  }

  deleteJob(id: number): Observable<{}> {
    const url = `${this.jobsUrl}/${id}`;
    return this.http.delete(url);
  }
}
