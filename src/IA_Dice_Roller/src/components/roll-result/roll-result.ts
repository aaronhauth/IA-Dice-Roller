import { Component } from '@angular/core';

/**
 * Generated class for the RollResultComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'roll-result',
  templateUrl: 'roll-result.html'
})
export class RollResultComponent {

  text: string;

  constructor() {
    console.log('Hello RollResultComponent Component');
    this.text = 'Hello World';
  }

}
