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

  private expanded: boolean;

  constructor() {
    console.log(this.aggregatedResult);
    console.log(this.results);
    this.expanded = false;
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  hasAttack(){
    return (this.aggregatedResult.damage + this.aggregatedResult.surge + this.aggregatedResult.range) > 0
  }

  hasDefense(){
    return (this.aggregatedResult.block + this.aggregatedResult.dodge + this.aggregatedResult.evade) > 0
  }

}
