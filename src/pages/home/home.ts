import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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
  datamodel: HomeModel = new HomeModel();
  datamodel2: any = [];
  prod_drink: any = [];
  prod_dessert: any = [];
  prod_food: any = [];
  user: any = [];
  constructor(public navCtrl: NavController,
    public homeservice: HomeService,
    private toastCtrl: ToastController,
    public ordersCom: OrderComponent,
    public navParams: NavParams
  ) {
    this.user = this.navParams.get('user');
    console.log(this.user);
  }
  ionViewDidLoad() {
    this.homeservice
      .getData()
      .then(data => {
        // console.log("Data Get : " + JSON.stringify(data));
        this.datamodel = data;
        this.datamodel2 = this.datamodel;


        // Local Data
        // this.prod_drink = this.homemo.products.filter(this.filterProductDrink);
        // this.prod_dessert = this.homemo.products.filter(this.filterProductDessert);
        // this.prod_food = this.homemo.products.filter(this.filterProductFood);

        // GET API Data
        this.prod_drink = this.datamodel2.filter(this.filterProductDrink);
        this.prod_dessert = this.datamodel2.filter(this.filterProductDessert);
        this.prod_food = this.datamodel2.filter(this.filterProductFood);


        // for (let i = 0; i < this.prod_drink.length; i++) {
        //   this.prod_drink[i].customStyle = 'background-image: url("http://www.menshealth.com/sites/menshealth.com/files/coffee-mug.jpg"); background-repeat: no-repeat; background-size: cover; background-position: center center;';
        // }
        // console.log("Data Homemo : " + JSON.stringify(this.homemodel2));
        // alert("Data Length : " + this.datamodel2.length);
        // console.log('Product : ' + JSON.stringify(this.homemodel2[0].category[0].name));
        // console.log('Product : ' + JSON.stringify(data));
        // alert(JSON.stringify(data));
        // console.log('Filter Product : ' + this.prod_drink);
      }).catch(err => { console.log(err); });
  }


  filterProductDrink(list) {
    // console.log(list.category[0].name);
    return list.category[0].name == "Drinks";

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
