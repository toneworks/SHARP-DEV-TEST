import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private url = 'http://193.124.114.46:3001/';

  private token;

  public setToken(token) {
    this.token = token;
  }

  get(path): Observable<any> {
    const options = {
      headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})
    };
    return this.http.get(this.url + path, options);
  }

  post(path, data): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
         Authorization: `Bearer ${this.token}`
      });
    const options = {headers};

    return this.http.post(this.url + path, data, options);
  }

  constructor(private http: HttpClient) { }
}
