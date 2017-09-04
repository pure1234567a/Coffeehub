import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PromotionModel } from './calculate.model';
import { UserComponent } from '../../components/user/user';

@Injectable()
export class CalculateService {
    apiUrl: string = 'https://coffeehub.herokuapp.com/';
    headers = new Headers({
        'Content-Type': 'application/json'
    });

    optionsURL = new RequestOptions({
        headers: this.headers
    });
    constructor(public http: Http, public Usercomp: UserComponent) {

    }

    //Local Data 
    // getData(): Promise<HomeModel> {
    //     return this.http.get('./assets/data/products.json')
    //         .toPromise()
    //         .then(response => response.json() as HomeModel)
    //         .catch(this.handleError);
    // }

    // Get Data from  Ass'computer
    getPromotiton(): Promise<PromotionModel> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiUrl + 'api/products').map(res => {
                // console.log(res);
                return res.json() as PromotionModel;
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
