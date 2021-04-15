import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobsUrl = 'http://localhost:3000/api/jobs';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Accepts: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  listJobs(): Observable<Job[]> {
    return this.http
      .get<Job[]>(this.jobsUrl, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getJob(id): Observable<Job> {
    console.log('Job', id);
    return this.http
      .get<Job>(`${this.jobsUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createJob(myjob): Observable<Job> {
    console.log('trying to save', JSON.stringify(myjob));
    return this.http
      .post<Job>(this.jobsUrl, JSON.stringify(myjob), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateJob(id, myjob): Observable<Job> {
    console.log('trying to update', id, myjob);
    const url = `${this.jobsUrl}/${id}`;
    return this.http
      .put<Job>(url, JSON.stringify(myjob), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteJob(id): Observable<{}> {
    const url = `${this.jobsUrl}/${id}`;
    return this.http
      .delete(url, { ...this.httpOptions, responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
