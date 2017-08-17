import { Component } from '@angular/core';

/**
 * Generated class for the PromotionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'promotion',
  templateUrl: 'promotion.html'
})
export class PromotionComponent {

  text: string;

  constructor() {
    console.log('Hello PromotionComponent Component');
    this.text = 'Hello World';
  }

}
