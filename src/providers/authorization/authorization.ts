import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthorizationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthorizationProvider {
  //////////////////// Declaration //////////////////////////
  apiUrl: string = 'https://coffeehub.herokuapp.com/';
  headers = new Headers({
    'Content-Type': 'application/json'
  });

  optionsURL = new RequestOptions({
    headers: this.headers
  });

  //////////////////// Declaration //////////////////////////
  constructor(public http: Http) {
    console.log('Hello AuthorizationProvider Provider');
  }

  signin(logindata): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'api/auth/signin', logindata, this.optionsURL).map(res => {
        return res.json();
      }).subscribe(data => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    })
  }
}
