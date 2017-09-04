
import { Component } from '@angular/core';
import { AlertController, Events, LoadingController, NavController } from 'ionic-angular';
import { ReceiptPage } from "../receipt/receipt";
import { OrdersProvider } from "../../providers/orders/orders";
import { PromotionComponent } from "../../components/promotion/promotion";
import { PromotionModel, promoArray } from "../calculate/calculate.model";
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
  public getpromotion: promoArray;
  public total = 0;
  private cashReceive: string = "0";
  private cashReceiveShow: string = "0";
  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    public promotionservice: PromotionComponent,
    public events: Events,
    public loadingCtrl: LoadingController,
    public ordersPVD: OrdersProvider
  ) {
    events.subscribe('callCal', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.total = 0;
      this.calculate();
    });
  }

  ionViewDidLoad() {
    this.calculate();
    console.log(this.ordersPVD.order);
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
      // Send Total amount , cash from cus , cash change
      let cashChange = parseInt(this.cashReceive) - this.total;
      console.log("total : " + this.total + "\n cash : " + this.cashReceive + "\n cashChange : " + cashChange);
      this.ordersPVD.preparingOrders(this.total, this.cashReceive, cashChange);


      // this.navCtrl.push(ReceiptPage);
    }

  }

  cancelOrder() {
    this.ordersPVD.order = [];
    this.navCtrl.pop();
  }

  calculate() {
    this.total = parseInt('0');
    for (let i = 0; i < this.ordersPVD.order.length; i++) {
      console.log("Qty. : " + parseInt(this.ordersPVD.order[i].qty));
      let totalsum = parseInt(this.ordersPVD.order[i].qty) * parseInt(this.ordersPVD.order[i].price);
      this.total += totalsum;
      console.log("this.summary.total : " + this.total);
      console.log("totalsum : " + this.total);
    }
    if (this.getpromotion) {
      // this.getpromotion.startdate = this.getpromotion.startdate.toLocaleDateString();

      console.log("++++ TEST  :  " + JSON.stringify(this.getpromotion));
      if (this.getpromotion.discounttype == "Percent") {
        console.log("+++++++xxxxxxxxxxxxxxxxxxx+");
        this.total = this.total - ((this.total / 100) * this.getpromotion.value);
      } else if (this.getpromotion.discounttype == "Baht") {
        this.total = this.total - this.getpromotion.value;
      }
    }
    this.total = this.addcomma(this.total);
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
      this.getpromotion = pro;
      // console.log("++++++++++++++++ " + this.getpromotion.discounttype);
      this.calculate();
    });
    let alert = this.alertCtrl.create({
      title: 'Promotion Code',
      enableBackdropDismiss: true,
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