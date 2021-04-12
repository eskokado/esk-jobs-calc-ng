import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Profile } from '../models/Profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profilesUrl = 'http://localhost:3000/api/profiles';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Accepts: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  listProfiles(): Observable<Profile[]> {
    return this.http
      .get<Profile[]>(this.profilesUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  getProfile(id): Observable<Profile> {
    return this.http
      .get<Profile>(`${this.profilesUrl}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  createProfile(myprofile): Observable<Profile> {
    console.log('trying to save', JSON.stringify(myprofile));
    return this.http
      .post<Profile>(
        this.profilesUrl,
        JSON.stringify(myprofile),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateProfile(id, myprofile): Observable<Profile> {
    console.log('trying to update', id, myprofile);
    const url = `${this.profilesUrl}/${id}`;
    return this.http
      .put<Profile>(url, JSON.stringify(myprofile), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteProfile(id) {
    const url = `${this.profilesUrl}/${id}`;
    return this.http
      .delete<Profile>(url, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
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
