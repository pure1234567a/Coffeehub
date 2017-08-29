import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Generated class for the TestcomComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'testcom',
  templateUrl: 'testcom.html'
})

export class TestcomComponent {
  @Input() nam: Array<any>;
  @Input() nam2: Object;
  @Output() dataout: EventEmitter<any> = new EventEmitter<any>();
  text: string;

  constructor() {
    console.log('Hello TestcomComponent Component');
    this.text = 'Hello World';
  }
  testclick(data) {
    this.dataout.emit(data);
  }
}
