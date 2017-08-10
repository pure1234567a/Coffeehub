import { Component, style } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalculatePage } from "../calculate/calculate";
import { HomeModel } from './home.model';
import 'rxjs/Rx';
import { HomeService } from "./home.service";
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
  private styleTxt: string = '';
  constructor(public navCtrl: NavController,
    public homeservice: HomeService
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
    this.navCtrl.push(CalculatePage);
  }
}
