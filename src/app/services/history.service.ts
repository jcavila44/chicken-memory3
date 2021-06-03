import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  games: AngularFireList<Game>;

  constructor(private db: AngularFireDatabase) {
    this.games = db.list(environment.path.game);
  }

  getGamesByUser(userKey: string): any {

    var response = ``;

    this.games.valueChanges().subscribe(element => {

      element.forEach(element => {
        if (element.player_key === userKey) {
          response += `{"date": "${element.date}", "player_key": "${element.player_key}", "score": "${element.score}"},`;
        }
      });

      console.log("adentro");
      console.log(response);

      // console.log(JSON.parse(response.slice(0, -1)));



    });

    console.log("afuera");

    console.log(response);

    // return JSON.parse(response.slice(-1));
    return response;

  }

}