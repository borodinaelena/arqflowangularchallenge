import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { 
  User, 
  Account, 
  Package,
  Section,
  LineItem,
  ComplianceField,
  Bid,
  BidRate,
  BidComplianceValue } from '../models';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    protected httpClient: HttpClient,
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get(
        `api/users`
      ).pipe(
        map((data: User[]) => {
          return data;
        }), catchError(error => {
          return throwError("Can't get users list");
        })
      )
  }

  getAccounts(): Observable<Account[]> {
    return this.httpClient
      .get(
        `api/accounts`
      ).pipe(
        map((data: Account[]) => {
          return data;
        }), catchError(error => {
          return throwError("Can't get accounts list");
        })
      )
  }

  getPackages(): Observable<Package[]> {
    return this.httpClient
      .get(
        `api/packages`
      ).pipe(
        map((data: Package[]) => {
          return data;
        }), catchError(error => {
          return throwError("Can't get packages list");
        })
      )
  }

  getSections(): Observable<Section[]> {
    return this.httpClient
      .get(
        `api/sections`
      ).pipe(
        map((data: Section[]) => {
          return data;
        }), catchError(error => {
          return throwError("Can't get sections list");
        })
      )
  }

  getLineItems(): Observable<LineItem[]> {
    return this.httpClient
      .get(
        `api/line_items`
      ).pipe(
        map((data: LineItem[]) => {
          return data;
        }), catchError(error => {
          return throwError("Can't get line_items list");
        })
      )
  }

  getComplianceFields(): Observable<ComplianceField[]> {
    return this.httpClient
      .get(
        `api/compliance_fields`
      ).pipe(
        map((data: ComplianceField[]) => {
          return data;
        }), catchError(error => {
          return throwError("Can't get compliance_fields list");
        })
      )
  }

  getBids(): Observable<Bid[]> {
    return this.httpClient
      .get(
        `api/bids`
      ).pipe(
        map((data: Bid[]) => {
          return data;
        }), catchError(error => {
          return throwError("Can't get bids list");
        })
      )
  }

  getBidRates(): Observable<BidRate[]> {
    return this.httpClient
      .get(
        `api/bid_rates`
      ).pipe(
        map((data: BidRate[]) => {
          return data;
        }), catchError(error => {
          return throwError("Can't get bid_rates list");
        })
      )
  }

  getBidComplianceValues(): Observable<BidComplianceValue[]> {
    return this.httpClient
      .get(
        `api/bid_compliance_values`
      ).pipe(
        map((data: BidComplianceValue[]) => {
          return data;
        }), catchError(error => {
          return throwError("Can't get bid_compliance_values list");
        })
      )
  }
}
