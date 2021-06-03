import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../models/game';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  games: AngularFireList<Game>;
  gamesDef: AngularFireList<Game>;

  constructor(private db: AngularFireDatabase) {
    this.games = db.list(environment.path.game);
  }

  getGamesByUser(userKey: string): any {

    this.gamesDef = this.db.list(environment.path.game,ref => ref.orderByChild('player_key').equalTo(userKey.toString()));
    return this.gamesDef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

}
