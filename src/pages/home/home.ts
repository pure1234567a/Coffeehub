import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalculatePage } from "../calculate/calculate";

import { HomeModel } from './home.model';
// import { HomeSSService } from './home.service';
import 'rxjs/Rx';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  homemo: HomeModel = new HomeModel();
  constructor(public navCtrl: NavController,
    //  public homeservice: HomeService
  ) {

  }
  gotocalculate() {
    this.navCtrl.push(CalculatePage)
  }
  ionViewDidLoad() {
    // this.homeservice
    //   .getData()
    //   .then(data => {
    //     this.homemo.products = data.products;
    //     this.homemo.orders = data.orders;
    //   });
  }

}
