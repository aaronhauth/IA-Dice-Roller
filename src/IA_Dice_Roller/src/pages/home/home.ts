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

  constructor(public navCtrl: NavController, public diceProvider : DiceProvider) {
    this.diceProvider.getDice()
    .subscribe(
      results => {this.dice = results ; console.log(this.dice);},
      error => console.log(error)
    );

    this.dicePool = [];
  }

  addToDicePool( die: Die ){
    this.dicePool.push(die);
    console.log(this.dicePool);
  }

  removeFromDicePool( die: Die ){
    this.dicePool.splice(this.dicePool.findIndex( x => x.color == die.color), 1);
  }

}
