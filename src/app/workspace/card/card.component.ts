import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsersListService} from '../users-list.service';
import {UserInfoService} from '../user-info.service';
import {TransactionsService} from '../transactions.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  sendDisabled = true;

  message;

  status = '';

  sending;

  send(){
    if(this.sendDisabled)
      this.message = 'Введите корректные данные';
    else{
      this.sending = true;
      this.trans.sendTransaction().subscribe(answer => {
        this.sending = false;
        if(answer == 200) {
          this.status = 'success';
          this.message = `Перевод ${this.trans.amount}PW пользователю ${this.trans.recipient} успешно выполнен`;
          this.router.navigateByUrl('');
        }
        if(answer == 400){
          this.message = `Пользователь "${this.trans.recipient}" не найден, перевод не выполнен`;
        }
      });
    }
  }

  changedRecipient(value) {
    this.trans.recipient = value;
    this.usersList.getUsers(value);
    this.checkSendButton();
  }

  changedAmount(input) {
    const value = input.value;
    if(value<0)
      input.value = 0;
    if(value>this.userInfo.balance)
      input.value = this.userInfo.balance;
    this.trans.amount = input.value;
    this.checkSendButton();
  }

  checkSendButton() {
    if(this.trans.recipient && this.trans.amount > 0) {
      this.message = '';
      this.sendDisabled = false;
    }
    else
      this.sendDisabled = true;
  }

  constructor(public router: Router, public usersList: UsersListService, private userInfo: UserInfoService, private trans: TransactionsService) {

  }

  ngOnInit() {
    this.checkSendButton()
  }

}
