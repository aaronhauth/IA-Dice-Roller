import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the DiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DiceProvider {

  data : any;

  constructor(public http : Http) {
    // load dice
    this.getData();
  }

  getData() {
    return this.http.get('assets/data/die-faces.json')
      .map(res => res.json());
  }

}
