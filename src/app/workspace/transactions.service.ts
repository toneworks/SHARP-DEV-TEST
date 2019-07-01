import { Injectable } from '@angular/core';
import {RequestService} from '../request.service';
import {Observable, of} from 'rxjs';
import {AuthenticationService} from '../authentication.service';
import {catchError, flatMap} from 'rxjs/operators';
import {UserInfoService} from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  amount;

  recipient;

  loaded = false;

  list;

  listAll;

  sinceDateFilter;
  sinceTimeFilter;
  toDateFilter;
  toTimeFilter;
  contractorFilter = '';
  sinceAmountFilter;
  toAmountFilter;

  justLoaded = new Observable(subscriber => this.justLoadedSubscriber = subscriber);
  private justLoadedSubscriber;

  public get filtersIsActive(){
    return (this.sinceDateFilter&&this.sinceTimeFilter)||(this.toDateFilter&&this.toTimeFilter)||
      this.contractorFilter||this.sinceAmountFilter||this.toAmountFilter;
  }

  getTransactions() {
    this.request.get('api/protected/transactions').subscribe(answer => {
      this.resetFilters();
      this.list  = this.listAll = answer.trans_token;
      this.loaded = true;
      this.justLoadedSubscriber.next();
    }, error => {
      alert('Ошика при получении списка транзакций');
    });
  }

  sendTransaction() {
    const name = this.recipient;
    const amount = this.amount;
    return this.request.post('api/protected/transactions', {name, amount}).pipe(
      flatMap(answer => {
        this.list = this.listAll;
        this.list.push(answer.trans_token);
        this.resetFilters();
        this.justLoadedSubscriber.next();
        this.userInfo.setBalance(answer.trans_token.balance);
        return of(200);
      }),
      catchError( () => of(400))
    );
  }

  setDateFilter(sinceDate, sinceTime, toDate, toTime) {
    this.sinceDateFilter = sinceDate;
    this.sinceTimeFilter = sinceTime;
    this.toDateFilter = toDate;
    this.toTimeFilter = toTime;

    this.filter();
  }

  setContractorFilter(value){
    this.contractorFilter = value;
    this.filter();
  }

  setSinceAmountFilter(value){
    this.sinceAmountFilter = value;
    this.filter();
  }

  setToAmountFilter(value){
    this.toAmountFilter = value;
    this.filter();
  }

  matchDateFilter(trans){
    const since = new Date(this.sinceDateFilter + ' ' + this.sinceTimeFilter);
    const to = new Date(this.toDateFilter + ' ' + this.toTimeFilter);
    const curr =  new Date(trans.date);
    // @ts-ignore
    if(!isNaN(since) && curr < since)
      return false;
    if(!isNaN(to) && curr > to)
      return false;
    return true;
  }

  matchContractorFilter(trans){
    if(!this.contractorFilter || new RegExp(this.contractorFilter).test(trans.username))
      return true;
    return false;
  }

  matchAmountFilter(trans){
    if(this.sinceAmountFilter && trans.amount < this.sinceAmountFilter)
      return false;
    if(this.toAmountFilter && trans.amount > this.toAmountFilter)
      return false;
    return true;
  }

  filter(){
    this.list = [];
    for(let i=0; i<this.listAll.length; i++) {
      const trans = this.listAll[i];
      if (
        this.matchDateFilter(trans) &&
        this.matchContractorFilter(trans) &&
        this.matchAmountFilter(trans))
        this.list.push(trans);
    }
    this.justLoadedSubscriber.next();
  }

  resetFilters(){
    this.sinceDateFilter = undefined;
    this.sinceTimeFilter = undefined;
    this.toDateFilter = undefined;
    this.toTimeFilter = undefined;

    this.contractorFilter = '';
    this.sinceAmountFilter = '';
    this.toAmountFilter = '';
    this.list = this.listAll;
    this.justLoadedSubscriber.next();
  }

  constructor(private request: RequestService, private auth: AuthenticationService, private userInfo: UserInfoService) {
    if(this.auth.token)
      this.getTransactions();
    this.auth.justLogin.subscribe(() => {
      this.getTransactions();
    });
  }
}
