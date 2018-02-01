import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DiceProvider } from '../../providers/dice/DiceProvider';
import { Die, DieSide } from '../../models/die';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DiceProvider]
})
export class HomePage {
  dice: Die[];
  dicePool: Die[];
  results: any;
  aggregatedResults: any;
  stats: any;

  constructor(public navCtrl: NavController, public diceProvider : DiceProvider) {
    this.diceProvider.getDice()
    .subscribe(
      results => {this.dice = results ; console.log(this.dice);},
      error => console.log(error)
    );

    this.aggregatedResults = null;
    this.dicePool = [];
  }

  addToDicePool( die: Die ){
    this.dicePool.push(die);
    console.log(this.dicePool);
    this.stats = this.diceProvider.computeStats(this.dicePool);
  }

  removeFromDicePool( die: Die ){
    this.dicePool.splice(this.dicePool.findIndex( x => x.color == die.color), 1);
  }

  rollDice(){
    this.results = this.diceProvider.rollDice(this.dicePool);

    this.aggregatedResults =  {
      damage : 0,
      surge : 0,
      range : 0,
      block : 0,
      dodge : 0,
      evade : 0
    }

    for (let result of this.results) {
      this.aggregatedResults.damage += result.damage;
      this.aggregatedResults.surge += result.surge;
      this.aggregatedResults.range += result.range;
      this.aggregatedResults.block += result.block;
      this.aggregatedResults.dodge += result.dodge;
      this.aggregatedResults.evade += result.evade;
    }

    console.log(this.results);
    this.stats = this.diceProvider.computeStats(this.dicePool);
  }

}
