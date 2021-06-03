import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, AngularFireObject  } from '@angular/fire/database';
import { environment } from '../../environments/environment';
import { Game } from '../models/game';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  game: AngularFireObject<Game>
  games: AngularFireList<Game>;

  constructor(private db: AngularFireDatabase) {
    this.game = db.object(environment.path.game);
    this.games = db.list(environment.path.game);
  }

  getGame(){
    return this.game;
  }

  getGamesByScore(){
    this.games = this.db.list(environment.path.game,ref => ref.orderByChild('score').limitToLast(5));
    return this.games.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    // .subscribe((data) =>{
    //     console.log("Data", data);
    // });
  }

  create(game: Game): any {
    return this.games.push(game);
  }

  update(game: Game): any{
    return this.game.update(game);
  }

  delete(): any {
    return this.game.remove();
  }
}
