import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BidRate, Account } from '../models';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public bidRates: BidRate[];
  public displayedColumns: string[];
  public yelowRate: number;
  public limeRate: number;
  public lightGreenRate: number;
  public dataSource = new MatTableDataSource([]);
  public tableData = [];
  public accounts: Account[];
  public accountRows: Account[] = [];
  constructor(public service: DataService) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.displayedColumns = [
      'reference',
      'description',
      'scope',
      'quantity',
    ];


    this.service.getBidRates()
      .subscribe(rates => {
        this.bidRates = rates;
        this.service.getAccounts()
          .subscribe(res => {
            this.accounts = res;

            rates.map(item => {
              const alreadyAdded = this.tableData.find(
                function (value) {
                  return value.id == item.line_item.id;
                }
              )
              
              if (alreadyAdded) {
                this.addAccountInfo(item, alreadyAdded);
              }
              else {
                this.tableData.push({
                  description: item.line_item.description,
                  reference: item.line_item.reference,
                  scope: item.line_item.scope,
                  units: item.line_item.units,
                  id: item.line_item.id,
                  quantity: item.line_item.quantity
                })
                this.addAccountInfo(item, this.tableData[this.tableData.length - 1]);
              }
            })
            this.getRateColors();

            this.dataSource = new MatTableDataSource(this.tableData);
            this.dataSource.sort = this.sort;

            this.accountRows.map(item => {
              this.displayedColumns.push('supplier' + item.id + "Rate")
              this.displayedColumns.push('supplier' + item.id + "Amount")
            })
          })

      })
  }

  addAccountInfo(item, tableElement) {
    this.accounts.map(account => {
      if (account.id === item.bid.supplier.id) {
        if (this.accountRows && !this.accountRows.includes(account)) {
          this.accountRows.push(account);
        }
        tableElement['supplier' + account.id + "Rate"] = item.rate;
        tableElement['supplier' + account.id + "Amount"] =
          Math.round((parseFloat(item.line_item.quantity) * parseFloat(item.rate)) * 100) / 100;
      }
    })
  }

  getRateColors() {

    let maxRate = 0;
    let minRate = 99999999999999999999;

    this.bidRates.map(item => {
      maxRate = maxRate < item.rate ? item.rate : maxRate;
      minRate = minRate > item.rate ? item.rate : minRate;
    })

    const difference = maxRate - minRate
    const halfRate = difference / 2;
    const fourthRte = difference / 4;

    this.yelowRate = minRate + fourthRte;
    this.limeRate = minRate + halfRate;
    this.lightGreenRate = minRate + halfRate + fourthRte
  }

  getClass(rate) {

    if (!rate) {
      return 'white'
    }

    const color = rate < this.yelowRate ? 'yellow' :
      (rate < this.limeRate ? 'lime' :
        (rate < this.lightGreenRate ? 'ligth' : 'green'));

    return color;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotal(account) {
    let res = 0;
    this.tableData.map(item => {
      res += item['supplier' + account.id + 'Amount'] ? item['supplier' + account.id + 'Amount'] : 0;
    })
    res = Math.round(res * 100) / 100;

    return res;
  }


}
