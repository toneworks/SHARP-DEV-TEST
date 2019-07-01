import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  name;
  email;
  password;
  confirmPassword;

  errorMessage;

  registration(){
    if(
      this.name&&
      this.email&&
      this.password&&
      this.password===this.confirmPassword)

      this.auth.registration(this.name, this.email, this.password).subscribe(answer => {
        if(answer===401)
          this.errorMessage = 'Данный эмейл уже зарегестрирован';
      })
    else
      this.errorMessage = 'Введите корректные данные';
  }

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

}
