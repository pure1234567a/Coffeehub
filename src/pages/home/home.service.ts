import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HomeModel } from './home.model';
import { CashierServiceProvider } from "../../providers/cashier-service/cashier-service";

@Injectable()
export class HomeService {
    apiUrl: string = 'http://192.168.1.119:3000/';
    headers = new Headers({
        'Content-Type': 'application/json'
    });

    optionsURL = new RequestOptions({
        headers: this.headers
    });

    constructor(public http: Http) { }

    //Local Data 
    // getData(Shop): Promise<HomeModel> {
    //     return this.http.get('./assets/data/home.json')
    //         .toPromise()
    //         .then(response => response.json() as HomeModel)
    //         .catch(this.handleError);
    // }

    // Get Data from  Ass'computer
    getData(Shop): Promise<HomeModel> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiUrl + 'api/getproducts/' + Shop, this.optionsURL).map(res => {
                return res.json();
            }).subscribe(data => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        })
    }




    //Backup
    //  getData(Shop): Promise<HomeModel> {
    //     return new Promise((resolve, reject) => {
    //         this.http.get(this.apiUrl + 'api/getproducts/' + Shop, this.optionsURL).map(res => {
    //             return res.json();
    //         }).subscribe(data => {
    //             resolve(data);
    //         }, (error) => {
    //             reject(error);
    //         });
    //     })
    // }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
