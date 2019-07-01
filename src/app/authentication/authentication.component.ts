import { Component, OnInit } from '@angular/core';
import {Router, RouterState} from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  page = 'login';

  constructor(public router: Router) {
  }

  ngOnInit() {
    if(this.router.url !== '/authentication/login' || this.router.url !== '/authentication/registration')
      this.router.navigateByUrl('/authentication/login');
  }

}
