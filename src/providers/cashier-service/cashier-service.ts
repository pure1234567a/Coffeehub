import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CashierServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CashierServiceProvider {
  apiUrl: string = 'http://192.168.1.119:3000/';
  headers = new Headers({
    'Content-Type': 'application/json'
  });

  optionsURL = new RequestOptions({
    headers: this.headers
  });

  constructor(public http: Http) {
  }
  getProductByshop(shop): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'api/getproducts/' + shop, this.optionsURL).map(res => {
        return res.json();
      }).subscribe(data => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    })
  };



}
