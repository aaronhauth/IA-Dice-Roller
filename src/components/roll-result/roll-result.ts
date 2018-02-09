import { Component, Input } from '@angular/core';

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

  @Input() aggregatedResult: any;
  @Input() results: any;

  constructor() {
    console.log(this.aggregatedResult);
    console.log(this.results);
  }

}
