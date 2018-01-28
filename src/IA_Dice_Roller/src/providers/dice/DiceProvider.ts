import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Die, DieSide } from '../../models/die';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the DiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DiceProvider {

  dice : Die[];

  constructor(public http : Http) {
    // load dice
    this.getDice();
  }

  getDice() {
    return this.http.get('assets/data/die-faces.json')
      .map(res => {
        var results : Die[] = [];
        for (let die of res.json().dice){
          var currentSides : DieSide[] = [];

          for(let side of die.sides) {
            var currentSide = new DieSide(side.damage, side.surge, side.url);
            currentSides.push(currentSide);
          }
          var currentDie = new Die(die.color, die.type, die.url, currentSides);
          results.push(currentDie);
        }
        return results;
      });
  }

}
