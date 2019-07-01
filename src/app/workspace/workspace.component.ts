import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {UserInfoService} from './user-info.service';
import {TransactionsService} from './transactions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  constructor(public auth: AuthenticationService, public userInfo: UserInfoService, public router: Router) { }

  ngOnInit() {
    if(!this.auth.token)
      this.router.navigateByUrl('/authentication/login');
    else
      this.router.navigateByUrl('');
  }

}
