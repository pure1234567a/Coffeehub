import { OrdersProvider } from '../../providers/orders/orders';
import { Component, Input, Output } from '@angular/core';
// import { CalculatePage } from "../../pages/calculate/calculate";

import { Events } from 'ionic-angular';
/**
 * Generated class for the MenulistComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'menulist',
  templateUrl: 'menulist.html'
})
export class MenulistComponent {
  @Input() ordersItem: Array<object>;
  @Output() xx;
  text: string;

  constructor(
    public events: Events,
    // private calpage: CalculatePage,
    private ordersPVD: OrdersProvider) {
    console.log('Hello MenulistComponent Component');
    this.text = 'Hello World';
  }


  decreseqtyitem(orderID2) {
    console.log(orderID2);
    for (let i = 0; i < this.ordersPVD.order.length; i++) {
      if (this.ordersPVD.order[i]._id == orderID2) {
        if (parseInt(this.ordersPVD.order[i].qty) > 1) {
          this.ordersPVD.order[i].qty = parseInt(this.ordersPVD.order[i].qty) - 1;
          this.events.publish('callCal');
          // this.calpage.summary.total = 0;
          // this.calpage.calculate();
          break;
        }
      }
    }
  }

  increseqtyitem(orderID2) {
    console.log(orderID2);
    for (let i = 0; i < this.ordersPVD.order.length; i++) {
      if (this.ordersPVD.order[i]._id == orderID2) {
        this.ordersPVD.order[i].qty = parseInt(this.ordersPVD.order[i].qty) + 1;
        this.events.publish('callCal');
        // this.summary.total = 0;
        // this.calculate();
        break;
      }
    }
  }
  deleteOrder(orderID) {
    console.log(orderID);
    for (let i = 0; i < this.ordersPVD.order.length; i++) {
      if (this.ordersPVD.order[i]._id == orderID) {
        this.ordersPVD.order.splice(i, 1);
        this.events.publish('callCal');
        break;
      }
    }
  }
}
