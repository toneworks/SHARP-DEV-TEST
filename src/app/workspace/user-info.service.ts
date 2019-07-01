import {Injectable} from '@angular/core';
import {RequestService} from '../request.service';
import {AuthenticationService} from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  id;

  email;

  name;

  balance;

  constructor(private request: RequestService) {

  }

  getUserInfo() {
    this.request.get('api/protected/user-info').subscribe(answer => {
      answer = answer.user_info_token;
      this.id = answer.id;
      this.email = answer.email;
      this.name = answer.name;
      this.balance = answer.balance;
    });
  }

  setBalance(balance) {
    this.balance = balance;
  }
}
