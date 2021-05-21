import { Injectable } from '@angular/core';
import { Player } from './../models/player';
import { AngularFireDatabase, AngularFireList, AngularFireAction, AngularFireObject  } from '@angular/fire/database';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  player: AngularFireObject<Player>
  players: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.player = db.object(environment.path.player);
    this.players = db.list("/player");
  }

  getPlayer(){
    return this.player;
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
