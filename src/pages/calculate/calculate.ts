import { PromotionModel } from '../../components/promotion/promotion.model';
import { Component } from '@angular/core';
import { AlertController, Events, LoadingController, NavController } from 'ionic-angular';
import { ReceiptPage } from "../receipt/receipt";

import { OrderComponent } from "../../components/order/order";
import { PromotionComponent } from "../../components/promotion/promotion";
/** 
 * Generated class for the CalculatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-calculate',
  templateUrl: 'calculate.html',
})
export class CalculatePage {
  // private orders: Array<any> = [];
  public getpromotion: PromotionModel = new PromotionModel();
  public total = 0;
  private cashReceive: string = "0";
  private cashReceiveShow: string = "0";
  constructor(public navCtrl: NavController, public ordersCom: OrderComponent,
    private alertCtrl: AlertController,
    public promotionservice: PromotionComponent,
    public events: Events,
    public loadingCtrl: LoadingController
  ) {
    events.subscribe('callCal', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.total = 0;
      this.calculate();
    });
  }

  ionViewDidLoad() {
    this.calculate();
    console.log(this.ordersCom.order);
  }
  swipeBackEnabled() {
  };

  calculatePayment() {
    let loading = this.loadingCtrl.create();
    if (this.cashReceive == '0') {
      loading.dismiss();
      alert('Please recieve money from customer!');
    } else if (parseInt(this.cashReceive) < this.total) {
      alert('Cash is not enough for pay!');
    } else {
      this.navCtrl.push(ReceiptPage);
    }

  }

  cancelOrder() {
    this.ordersCom.order = [];
    this.navCtrl.pop();
  }

  calculate() {
    this.total = parseInt('0');
    for (let i = 0; i < this.ordersCom.order.length; i++) {
      console.log("Amount : " + parseInt(this.ordersCom.order[i].amount));
      let totalsum = parseInt(this.ordersCom.order[i].amount) * parseInt(this.ordersCom.order[i].price);
      this.total += totalsum;
      console.log("this.summary.total : " + this.total);
      console.log("totalsum : " + this.total);
    }
    if (this.getpromotion.promotions) {
      // console.log("++++ " + this.getpromotion.promotions[0].discounttype.find("discounttype", "Percent", res => { }));
      // if (this.getpromotion.promotions[0].discounttype == ["Percent"]) {
      //   console.log("+++++++xxxxxxxxxxxxxxxxxxx+");
      //   this.total = this.total - ((this.total / 100) * this.getpromotion.promotions[0].value);
      // } else if (this.getpromotion.promotions.find(this.findProtypeBaht)) {
      //   this.total = this.total - this.getpromotion.promotions[0].value;
      // }
    }
    this.total = this.addcomma(this.total);
  }

  findProtypePercent(type) {
    console.log("+++++++++++++");
    return type.discounttype == "Percent"
  }
  findProtypeBaht(type) {
    return type.discounttype == "Baht";
  }

  clickNum(num) {
    if (this.cashReceive == "0" && num != "0" && num != "00" && this.cashReceive.length == 1) {
      this.cashReceive = num;
    } else if (this.cashReceive.length >= 1) {
      this.cashReceive += num;
    }
    this.cashReceiveShow = this.addcomma(this.cashReceive);
  }
  addcomma(cashReceive) {
    return cashReceive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  clickDel() {
    console.log("DEl");
    if (this.cashReceive !== null && this.cashReceive.length > 1) {

      this.cashReceive = this.cashReceive.substring(0, this.cashReceive.length - 1);
      this.cashReceiveShow = this.addcomma(this.cashReceive);
    } else {
      console.log("click");
      this.cashReceive = "0"; this.cashReceiveShow = "0";
      this.cashReceiveShow = this.addcomma(this.cashReceive);

    }
  }

  clickClear() {
    this.cashReceive = "0"; this.cashReceiveShow = "0";
  }
  inputPromotion() {
    this.events.subscribe('getpro', (pro) => {
      console.log('Show pro : ', pro);
      this.getpromotion.promotions = pro;
      this.calculate();
    });
    let alert = this.alertCtrl.create({
      title: 'Promotion Code',
      inputs: [
        {
          name: 'code',
          placeholder: 'Fill Promotion Code'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.promotionservice.validatePromotion(data.code);
            console.log("CODE : " + data.code);
            // if (User.isValid(data.username, data.password)) {
            //   // logged in!
            // } else {
            //   // invalid login
            //   return false;
            // }
          }
        }
      ]
    });
    alert.present();
  }
}