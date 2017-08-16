import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { CalculatePage } from "../calculate/calculate";
import { HomeModel } from './home.model';
import 'rxjs/Rx';

import { HomeService } from "./home.service";
import { OrderComponent } from "../../components/order/order";
// import { CashierServiceProvider } from "../../providers/cashier-service/cashier-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menu = "drink";
  homemo: HomeModel = new HomeModel();
  homemodel2: any = [];
  prod_drink: any = [];
  prod_dessert: any = [];
  prod_food: any = [];
  // public orders: Array<any> = [];
  shopID = '598d2b7aae23b74036451c77';
  constructor(public navCtrl: NavController,
    public homeservice: HomeService,
    private toastCtrl: ToastController,
    public ordersCom: OrderComponent
    // private callservice: CashierServiceProvider
  ) {
  }
  ionViewDidLoad() {
    this.homeservice
      .getData(this.shopID)
      .then(data => {
        // let getData = data;
        // console.log("Data Get : " + JSON.stringify(data));
        this.homemo = data;
        this.homemodel2 = this.homemo;
        // this.homemo.orders = data.orders;
        // Local Data
        // this.prod_drink = this.homemo.products.filter(this.filterProductDrink);
        // this.prod_dessert = this.homemo.products.filter(this.filterProductDessert);
        // this.prod_food = this.homemo.products.filter(this.filterProductFood);

        // GET API Data
        this.prod_drink = this.homemodel2.filter(this.filterProductDrink);
        this.prod_dessert = this.homemodel2.filter(this.filterProductDessert);
        this.prod_food = this.homemodel2.filter(this.filterProductFood);


        // for (let i = 0; i < this.prod_drink.length; i++) {
        //   this.prod_drink[i].customStyle = 'background-image: url("http://www.menshealth.com/sites/menshealth.com/files/coffee-mug.jpg"); background-repeat: no-repeat; background-size: cover; background-position: center center;';
        // }
        console.log("Data Homemo : " + JSON.stringify(this.homemo.products));
        // console.log('Filter Product : ' + this.prod_drink);
      }).catch(err => { console.log(err); });
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
    if (this.ordersCom.order.length) {
      this.navCtrl.push(CalculatePage);
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
    let indexOfArr = this.ordersCom.order.findIndex(i => i._id === item._id);
    console.log(indexOfArr);
    if (indexOfArr == -1) {
      item.amount = 1;
      if (item.category[0].subcate == "coffee") {
        item.sweetness = "medium";
        item.degrees = "half";
      }

      this.ordersCom.order.push(item);
    } else {
      this.ordersCom.order[indexOfArr].amount = parseInt(this.ordersCom.order[indexOfArr].amount) + 1;
    }

    console.log(this.ordersCom.order);
  }

  deleteOrder(orderID) {
    console.log(orderID);
    for (let i = 0; i < this.ordersCom.order.length; i++) {
      if (this.ordersCom.order[i]._id == orderID) {
        this.ordersCom.order.splice(i, 1);
        break;
      }
    }
  }
  increseqtyitem(orderID2) {
    console.log(orderID2);
    for (let i = 0; i < this.ordersCom.order.length; i++) {
      if (this.ordersCom.order[i]._id == orderID2) {
        this.ordersCom.order[i].amount = parseInt(this.ordersCom.order[i].amount) + 1;
        break;
      }
    }
  }
  decreseqtyitem(orderID2) {
    console.log(orderID2);
    for (let i = 0; i < this.ordersCom.order.length; i++) {
      if (this.ordersCom.order[i]._id == orderID2) {
        if (parseInt(this.ordersCom.order[i].amount) > 1) {
          this.ordersCom.order[i].amount = parseInt(this.ordersCom.order[i].amount) - 1;
          break;
        }

      }
    }
  }
  clearList() {
    this.ordersCom.order = [];
  }

}
