import { Component } from '@angular/core';

/**
 * Generated class for the OrderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'order',
  templateUrl: 'order.html'
})
export class OrderComponent {
  public order: Array<any> = [];
  constructor() {
  }

}
