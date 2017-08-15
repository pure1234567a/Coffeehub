import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { CalculatePage } from "../calculate/calculate";
import { HomeModel } from './home.model';
import 'rxjs/Rx';

import { HomeService } from "./home.service";
// import { CashierServiceProvider } from "../../providers/cashier-service/cashier-service";

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
  public orders: Array<any> = [];
  shopID = '598d2b7aae23b74036451c77'
  constructor(public navCtrl: NavController,
    public homeservice: HomeService,
    private toastCtrl: ToastController,
    // private callservice: CashierServiceProvider
  ) {

  }
  gotocalculate() {
    this.navCtrl.push(CalculatePage);
  }
  ionViewDidLoad() {
    // this.callservice.getProductByshop('598d2b7aae23b74036451c77').then((res) => {
    //   console.log('Data : ' + JSON.stringify(res));
    // }).catch((err) => {
    //   console.log('ERR : ' + err);
    // });

    this.homeservice
      .getData(this.shopID)
      .then(data => {
        console.log(data);

        this.homemo.products = data.products;
        // this.homemo.orders = data.orders;
        this.prod_drink = this.homemo.products.filter(this.filterProductDrink);
        this.prod_dessert = this.homemo.products.filter(this.filterProductDessert);
        this.prod_food = this.homemo.products.filter(this.filterProductFood);

        // for (let i = 0; i < this.prod_drink.length; i++) {
        //   this.prod_drink[i].customStyle = 'background-image: url("http://www.menshealth.com/sites/menshealth.com/files/coffee-mug.jpg"); background-repeat: no-repeat; background-size: cover; background-position: center center;';
        // }

        // console.log('Filter Product : ' + this.prod_drink);
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
    if (this.orders.length) {
      this.navCtrl.push(CalculatePage, { ord: this.orders });
    } else {
      let toast = this.toastCtrl.create({
        message: 'No order to calculate',
        duration: 3000,
        position: 'middle',
        cssClass: 'toasttextcenter'
      });
      toast.present();
    }
  }
  addtoOrder(item) {
    console.log(item);
    let indexOfArr = this.orders.findIndex(i => i._id === item._id);
    console.log(indexOfArr);
    if (indexOfArr == -1) {
      item.amount = 1;
      if (item.category[0].subcate == "coffee") {
        item.sweetness = "medium";
        item.degrees = "half";
      }

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
  clearList() {
    this.orders = [];
  }

}
