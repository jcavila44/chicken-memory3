import { PlayersService } from 'src/app/services/players.service';
import { Game } from 'src/app/models/game';
import { GamesService } from 'src/app/services/games.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-score-five',
  templateUrl: './score-five.component.html',
  styleUrls: ['./score-five.component.scss'],
})
export class ScoreFiveComponent implements OnInit {
  data = [{name:'diego',score:99999},{name:'vivi',score:79999},{name:'devil',score:69999},{name:'carol',score:49999},{name:'jugadorx',score:39999}]


  gameScores: Game[];

  constructor(public gamesService: GamesService,
    public playersService: PlayersService) { }

  ngOnInit() {

    this.gamesService.getGamesByScore().subscribe((data) =>{
      this.gameScores = data;

      this.gameScores.map((game)=>{
         this.playersService.getPlayerByKey(game.player_key).subscribe((player)=>{
           game.player = player[0];
          });

      })
      });
  }

  onClick(key_game: string){

  }

}
