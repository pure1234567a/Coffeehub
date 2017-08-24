import { Component, Input } from '@angular/core';
// import { CalculatePage } from "../../pages/calculate/calculate";
import { OrderComponent } from '../order/order';
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
  @Input('datas') items: Array<object>;
  text: string;

  constructor(
    public events: Events,
    // private calpage: CalculatePage,
    private ordersCom: OrderComponent) {
    console.log('Hello MenulistComponent Component');
    this.text = 'Hello World';
  }


  decreseqtyitem(orderID2) {
    console.log(orderID2);
    for (let i = 0; i < this.ordersCom.order.length; i++) {
      if (this.ordersCom.order[i]._id == orderID2) {
        if (parseInt(this.ordersCom.order[i].amount) > 1) {
          this.ordersCom.order[i].amount = parseInt(this.ordersCom.order[i].amount) - 1;
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
    for (let i = 0; i < this.ordersCom.order.length; i++) {
      if (this.ordersCom.order[i]._id == orderID2) {
        this.ordersCom.order[i].amount = parseInt(this.ordersCom.order[i].amount) + 1;
        this.events.publish('callCal');
        // this.summary.total = 0;
        // this.calculate();
        break;
      }
    }
  }
  deleteOrder(orderID) {
    console.log(orderID);
    for (let i = 0; i < this.ordersCom.order.length; i++) {
      if (this.ordersCom.order[i]._id == orderID) {
        this.ordersCom.order.splice(i, 1);
        this.events.publish('callCal');
        break;
      }
    }
  }
}
