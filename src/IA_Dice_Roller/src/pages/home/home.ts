import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DiceProvider } from '../../providers/dice/DiceProvider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DiceProvider]
})
export class HomePage {
  dice: any;
  constructor(public navCtrl: NavController, public diceProvider : DiceProvider) {
    this.diceProvider.getData()
    .subscribe(
      results => this.dice = results.dice,
      error => console.log(error)
    );
  }
}
