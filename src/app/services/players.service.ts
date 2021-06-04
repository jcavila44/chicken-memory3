import { Injectable } from '@angular/core';
import { Player } from './../models/player';
import { AngularFireDatabase, AngularFireList, AngularFireAction, AngularFireObject  } from '@angular/fire/database';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  player: AngularFireObject<Player>
  players: AngularFireList<Player>;
  playerDef : AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.player = db.object(environment.path.player);
    this.players = db.list("/player");

  }

  getPlayer(uid: string){
    this.playerDef = this.db.list("/player",ref => ref.orderByChild('uid').equalTo(uid));
    return this.playerDef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getPlayerByKey(key: string){
    // console.log(key);
    this.playerDef = this.db.list("/player",ref => ref.orderByChild('uid').equalTo(key));
    return this.playerDef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getPlayers(){
    return this.players;
  }
  create(player: Player): any {
    return this.players.push(player);
  }

  update(player: Player): any{
    return this.player.update(player);
  }

  delete(): any {
    return this.player.remove();
  }
}
