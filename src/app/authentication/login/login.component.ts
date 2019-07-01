import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email;

  password;

  wrongPassword;

  login() {
    this.auth.login(this.email, this.password).subscribe(answer => {
      if(answer === 401)
        this.wrongPassword = true;
      else
        this.router.navigateByUrl('/workspace');
    });
  }

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

}
