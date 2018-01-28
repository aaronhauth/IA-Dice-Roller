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
            var currentSide = new DieSide(side.damage, side.surge, side.range, side.block, side.evade, side.dodge, side.url);
            currentSides.push(currentSide);
          }
          var currentDie = new Die(die.color, die.type, die.url, currentSides);
          results.push(currentDie);
        }
        return results;
      });
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  rollDice(dice: Die[]) {
    var results : any = {};
    results.damage = 0;
    results.range = 0;
    results.surge = 0;
    results.block = 0;
    results.dodge = 0;
    results.evade = 0;
    
    for (let die of dice){
      var side = this.getRandomInt(0, 6);
      results.damage += die.sides[side].damage || 0;
      results.range += die.sides[side].range || 0;
      results.surge += die.sides[side].surge || 0;
      results.block += die.sides[side].block || 0;
      results.dodge += die.sides[side].dodge || 0;
      results.evade += die.sides[side].evade || 0;
    }

    return results;
  }

}
