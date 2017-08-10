import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalculatePage } from "../calculate/calculate";
import { HomeModel } from './home.model';
import 'rxjs/Rx';

import { HomeService } from "./home.service";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menu = "drink";
  homemo: HomeModel = new HomeModel();
  prod_drink: any = [];
  prod_dessert: any = [];
  prod_food: any = [];
  private orderDaft: any = [];

  constructor(public navCtrl: NavController,
    public homeservice: HomeService,
    private storage: Storage
  ) {

    this.createDraftOrder();

  }
  gotocalculate() {
    this.navCtrl.push(CalculatePage)
  }
  ionViewDidLoad() {
    this.homeservice
      .getData()
      .then(data => {
        // console.log(data);
        this.homemo.products = data.products;
        this.homemo.orders = data.orders;
        this.prod_drink = this.homemo.products.filter(this.filterProductDrink);
        this.prod_dessert = this.homemo.products.filter(this.filterProductDessert);
        this.prod_food = this.homemo.products.filter(this.filterProductFood);

        // for (let i = 0; i < this.prod_drink.length; i++) {
        //   this.prod_drink[i].customStyle = 'background-image: url("http://www.menshealth.com/sites/menshealth.com/files/coffee-mug.jpg"); background-repeat: no-repeat; background-size: cover; background-position: center center;';
        // }

        console.log(this.prod_drink);
      });
  }

  filterProductDrink(list) {
    // console.log(list);
    return list.category[0].name == 'Drink';
  }
  filterProductDessert(list) {
    return list.category[0].name == 'Dessert';
  }
  filterProductFood(list) {
    return list.category[0].name == 'Food';
  }
  gotoCalculate() {
    if (this.orderDaft.length) {


      // this.storage.setItem('order', )
      this.navCtrl.push(CalculatePage);
    }


  }
  createDraftOrder() {
    this.orderDaft = {
      'item': [
        {
          'product_id': '',
          'amount': 0,
          'qty': 0,
        }
      ],
      'shop_id': '',
      'date': new Date(),
      'emp_id': ''
    };
  }
  addtoOrder(item) {
    console.log(item);
    // this.orderDaft.item.put();
  }
}
