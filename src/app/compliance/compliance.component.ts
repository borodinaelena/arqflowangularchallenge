import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BidComplianceValue, Account } from '../models';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.scss']
})
export class ComplianceComponent implements OnInit {

  public complianceValues: BidComplianceValue[];
  public displayedColumns: string[] = [];
  public tableData = [];
  public dataSource = new MatTableDataSource([]);
  public accounts: Account[];
  public accountRows: Account[] = [];

  @ViewChild(MatSort) sort: MatSort;

  constructor(public service: DataService) { }

  ngOnInit(): void {
    this.displayedColumns = [
      'reference',
      'description',
      'type',
      'requirement'
    ];
    this.service.getBidComplianceValues()
      .subscribe(res => {
        this.complianceValues = res;
        this.service.getAccounts()
          .subscribe(res => {
            this.accounts = res;

            this.complianceValues.map(item => {

              this.checkColumn(item);

              const alreadyAdded = this.tableData.find(
                function (value) {
                  return value.reference == item.compliance_field.reference;
                }
              )
              if (alreadyAdded) {
                alreadyAdded['s' + item.bid.supplier.id] = item.bid.supplier.name;
              }
              else {
                this.tableData.push({
                  reference: item.compliance_field.reference,
                  description: item.compliance_field.description,
                  type: item.compliance_field.type,
                  requirement: item.compliance_field.requirement
                })
                this.tableData[this.tableData.length - 1]['s' + item.bid.supplier.id] = item.bid.supplier.name;
              }
            })
            this.dataSource = new MatTableDataSource(this.tableData);
            this.dataSource.sort = this.sort;
          })
      })
  }

  checkColumn(item) {
    const colomnAdded = this.displayedColumns.find(
      function (value) {
        return value == 's' + item.bid.supplier.id;
      }
    )
    if (colomnAdded === undefined) {
      this.displayedColumns.push('s' + item.bid.supplier.id);
      this.accountRows.push(item.bid.supplier);
    }
  }

}
