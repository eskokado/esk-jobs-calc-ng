import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile, saveProfile } from '../resources/profiles';

@Injectable()
export class ProfileService {
  private profileUrl = 'http://localhost:3000/api/v1/profiles';
  private headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    Accepts: 'application/json',
    'Content-Type': 'application/json',
  });

  public constructor(private http: HttpClient) {}

  listProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.profileUrl);
  }

  getJob(profileId: string) {
    return this.http.get<Profile>(`${this.profileUrl}/${profileId}`);
  }

  insertJob(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.profileUrl, profile);
  }

  updateJob(id: number, profile: saveProfile): Observable<Profile> {
    const url = `${this.profileUrl}/${id}`;
    return this.http.put<Profile>(url, JSON.stringify(profile));
  }

  deleteJob(id: number): Observable<{}> {
    const url = `${this.profileUrl}/${id}`;
    return this.http.delete(url);
  }
}
