import { Component } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';
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
  public getpromotion: any;
  // public promofield = null;
  public summary: any = {
    total: 0
  };
  private cashReceive: string = "0";
  private cashReceiveShow: string = "0";
  constructor(public navCtrl: NavController, public ordersCom: OrderComponent,
    private alertCtrl: AlertController,
    public promotionservice: PromotionComponent,
    public events: Events
  ) {
    events.subscribe('callCal', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.summary.total = 0;
      this.calculate();
    });
  }

  ionViewDidLoad() {
    this.calculate();
    console.log(this.ordersCom.order);
  }
  swipeBackEnabled() {
  };

  gotoReceiptpage() {
    this.navCtrl.push(ReceiptPage);
  }

  cancelOrder() {
    this.ordersCom.order = [];
    this.navCtrl.pop();
  }

  decreseqtyitem(orderID2) {
    console.log(orderID2);
    for (let i = 0; i < this.ordersCom.order.length; i++) {
      if (this.ordersCom.order[i]._id == orderID2) {
        if (parseInt(this.ordersCom.order[i].amount) > 1) {
          this.ordersCom.order[i].amount = parseInt(this.ordersCom.order[i].amount) - 1;
          this.summary.total = 0;
          this.calculate();
          break;
        }

      }
    }
  }
  increseqtyitem(orderID2) {
    console.log(orderID2);
    for (let i = 0; i < this.ordersCom.order.length; i++) {
      if (this.ordersCom.order[i]._id == orderID2) {
        this.ordersCom.order[i].amount = parseInt(this.ordersCom.order[i].amount) + 1;
        this.summary.total = 0;
        this.calculate();
        break;
      }
    }
  }

  deleteOrder(orderID) {
    console.log(orderID);
    for (let i = 0; i < this.ordersCom.order.length; i++) {
      if (this.ordersCom.order[i]._id == orderID) {
        this.ordersCom.order.splice(i, 1);
        if (this.ordersCom.order.length == 0) {
          this.navCtrl.pop();
        }
        this.summary.total = 0;
        this.calculate();
        break;
      }

    }
  }


  calculate() {
    let total = 0;
    for (let i = 0; i < this.ordersCom.order.length; i++) {
      console.log("Amount : " + parseInt(this.ordersCom.order[i].amount));
      let totalsum = parseInt(this.ordersCom.order[i].amount) * parseInt(this.ordersCom.order[i].price);
      total += totalsum;
      console.log("this.summary.total : " + this.summary.total);
      console.log("totalsum : " + totalsum);
    }
    if (this.getpromotion) {
      if (this.getpromotion.discounttype == "Percent") {
        total = total - ((total / 100) * this.getpromotion.value);
      } else if (this.getpromotion.discounttype == "Baht") {
        total = total - this.getpromotion.value;
      }
    }
    this.summary.total = this.addcomma(total);
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
    if (this.cashReceive != null && this.cashReceive.length > 0) {
      this.cashReceive = this.cashReceive.substring(0, this.cashReceive.length - 1);
      this.cashReceiveShow = this.addcomma(this.cashReceive);
    }

  }
  clickClear() {
    this.cashReceive = "0"; this.cashReceiveShow = "0";
  }
  inputPromotion() {
    this.events.subscribe('getpro', (pro) => {
      console.log('Show pro : ', pro);
      this.getpromotion = pro;
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