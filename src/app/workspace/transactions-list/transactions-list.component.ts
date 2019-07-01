import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TransactionsService} from '../transactions.service';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  dataSource;// = new MatTableDataSource([]);

  displayedColumns = ['date', 'username', 'amount', 'balance'];

  pageSize = 10;

  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  setDataSource() {
    this.dataSource = new MatTableDataSource(this.trans.list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private trans: TransactionsService) {
    if(this.trans.loaded)
      this.setDataSource();
    this.trans.justLoaded.subscribe(() => {
      this.setDataSource();
    });
  }

  setPaginatorSize(size) {
    this.pageSize = size;
    setTimeout(() => this.setDataSource(), 10);
  }

  ngOnInit() {
  }

}
