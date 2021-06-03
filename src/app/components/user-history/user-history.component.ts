import { Game } from 'src/app/models/game';
import { PlayersService } from 'src/app/services/players.service';
import { AuthenticationService } from './../../services/authentication-service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { element } from 'protractor';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/models/player';



export interface USERS {
  users: string;
}

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UserHistoryComponent implements OnInit {

  public Users: USERS;
  public col: any;
  public rows: any;
  public games: Game[];
  public player: Player;
  public nameUser: any;
  public buttonCustomColor: string = 'primary';

  constructor(
    private httpClient: HttpClient,
    public historyService: HistoryService,
    public autService: AuthenticationService,
    public playersService: PlayersService
  ) {
  }

  ngOnInit() {
    this.getGameshistory();
  }


  async getGameshistory() {


    this.col = [
      { name: 'date' },
      { name: 'score' }
    ];

    this.playersService.getPlayer(this.autService.LoggedData.uid).subscribe(user => {
      this.player = user[0];

      this.nameUser = this.capitalizarPalabras(this.player.name);
      console.log(this.player);

      this.historyService.getGamesByUser(this.player.uid).subscribe(data => {
        this.games = data;

        this.rows = this.games;
        console.log(this.games);


      });
    });
  }


  capitalizarPalabras(data): string {
    return data.toLowerCase()
      .trim()
      .split(' ')
      .map(v => v[0].toUpperCase() + v.substr(1))
      .join(' ');
  }
}
