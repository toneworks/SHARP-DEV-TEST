import { Injectable } from '@angular/core';
import {RequestService} from '../request.service';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  filteredUsers = [];

  getUsers(filterString) {
    if(filterString)
      this.request.post('api/protected/users/list', {filter: filterString}).subscribe(answer => {
        console.log(answer);
        this.filteredUsers = answer;
      });
    else
      this.filteredUsers = [];
  }

  constructor(private request: RequestService) {
    // this.getUsers();
  }
}
