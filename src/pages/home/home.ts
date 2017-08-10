import { parseDate } from 'ionic-angular/umd/util/datetime-util';
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
  private orders: Array<any> = [];

  constructor(public navCtrl: NavController,
    public homeservice: HomeService,
    private storage: Storage
  ) {

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
    if (this.orderDaft) {


      // this.storage.setItem('order', )
      this.navCtrl.push(CalculatePage);
    }


  }


  // createDraftOrder() {
  //   this.orderDaft = {
  //     'item': [
  //       {
  //         'name': '',
  //         'product_id': '',
  //         'amount': 0,
  //         'qty': 0,
  //       }
  //     ],
  //     'shop_id': '',
  //     'date': new Date(),
  //     'emp_id': ''
  //   };
  // }
  addtoOrder(item) {
    console.log(item);
    let indexOfArr = this.orders.findIndex(i => i._id === item._id);
    console.log(indexOfArr);
    if (indexOfArr == -1) {
      item.amount = 1;
      this.orders.push(item);
    } else {
      console.log('HAVE');
      this.orders[indexOfArr].amount = parseInt(this.orders[indexOfArr].amount) + 1;
    }

    console.log(this.orders);
  }

  deleteOrder(orderID) {
    console.log(orderID);
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i]._id == orderID) {
        this.orders.splice(i, 1);
        break;
      }
    }
  }
  increseqtyitem(orderID2) {
    console.log(orderID2);
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i]._id == orderID2) {
        this.orders[i].amount = parseInt(this.orders[i].amount) + 1;
        break;
      }
    }
  }
  decreseqtyitem(orderID2) {
    console.log(orderID2);
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i]._id == orderID2) {
        if (parseInt(this.orders[i].amount) > 1) {
          this.orders[i].amount = parseInt(this.orders[i].amount) - 1;
          break;
        }

      }
    }
  }
}
