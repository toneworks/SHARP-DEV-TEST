import { Injectable } from '@angular/core';
import {CookieService} from './cookie.service';
import {RequestService} from './request.service';
import {Observable, of} from 'rxjs';
import {catchError, flatMap} from 'rxjs/operators';
import {UserInfoService} from './workspace/user-info.service';
import {Router} from '@angular/router';
import {TransactionsService} from './workspace/transactions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token;

  justLogin;

  justLoginSubscriber;

  private setLoggedIn(token) {
    this.router.navigateByUrl('/');
    this.token = token;
    this.cookie.setCookie('id_token', token, {expires: 2592000});
    this.request.setToken(token);
    this.userInfo.getUserInfo();
    this.justLoginSubscriber.next();
  }

  login(email, password) {
    const obs = this.request.post('sessions/create', {email, password});
    return obs.pipe(flatMap((answer: any) => {
      this.setLoggedIn(answer.id_token);
      return of(answer);
    }), catchError(err => {
      return of(401);
    }));
  }

  registration(username, email, password) {
    const obs = this.request.post('users', {username, password, email});
    return obs.pipe(flatMap((answer: any) => {
      this.setLoggedIn(answer.id_token);
      return of(answer);
    }), catchError(err => {
      return of(401);
    }));
  }

  exit() {
    this.router.navigateByUrl('');
    this.cookie.deleteCookie('id_token');
    this.token = undefined;
    this.request.setToken(this.token);
    this.router.navigateByUrl('/authentication/login');
  }

  constructor(private cookie: CookieService, private request: RequestService,
              private userInfo: UserInfoService, private router: Router) {
    this.token = this.cookie.getCookie('id_token');
    if(this.token) {
      this.request.setToken(this.token);
      this.userInfo.getUserInfo();
    }
    this.justLogin = new Observable(subscriber => this.justLoginSubscriber = subscriber);
  }
}
