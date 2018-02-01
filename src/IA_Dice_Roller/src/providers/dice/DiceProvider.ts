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
    var results : any[] = [];

    
    for (let die of dice){
      var side = this.getRandomInt(0, 6);
      var result : any = {
        damage : 0,
        range : 0,
        surge : 0,
        block : 0,
        dodge : 0,
        evade : 0
      }


      result.color = die.color;
      result.url = die.url;
      result.damage = die.sides[side].damage || 0;
      result.range = die.sides[side].range || 0;
      result.surge = die.sides[side].surge || 0;
      result.block = die.sides[side].block || 0;
      result.dodge = die.sides[side].dodge || 0;
      result.evade = die.sides[side].evade || 0;
      console.log(result);
      results.push(result);
    }

    

    return results;
  }

  computeStats(dice: Die[]){
    var results : any = {};
    var stats = ["damage", "surge", "block", "range", "evade", "dodge"];
    for (let die of dice) {
      for (let stat of stats) {
        var result = this.computeSingleStat(die, stat);
        

        if (results[stat]) {
          results[stat].max += result.max;
          results[stat].min += result.min;
          results[stat].average += result.average;
        }
        else {
          results[stat] = result;
        } 
      }     
    }
    console.log(results);
  }

  computeSingleStat(die : Die, stat : string) {
    var min = 999;
    var max = 0;
    var average = 0;
    var sum = 0;

    for(let side of die.sides){
      var value : number = Number(side[stat]) || 0;
      if (value > max)
      {
        max = value
      }
      if (value < min) {
        min = value
      }
      sum += value;
    }

    average = sum / 6;
    var result : any = {
      min : min,
      max : max,
      average : average
    }

    return result;
  }

}
