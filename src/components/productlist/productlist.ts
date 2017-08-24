import { Component } from '@angular/core';

/**
 * Generated class for the ProductlistComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'productlist',
  templateUrl: 'productlist.html'
})
export class ProductlistComponent {

  text: string;

  constructor() {
    console.log('Hello ProductlistComponent Component');
    this.text = 'Hello World';
  }

}
