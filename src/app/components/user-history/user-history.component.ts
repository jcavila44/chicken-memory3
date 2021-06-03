import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { Game } from '../../models/game';
import { element } from 'protractor';


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
  public game: Game;

  constructor(
    private httpClient: HttpClient,
    public historyService: HistoryService
  ) {


    this.col = [
      { name: 'Fecha' },
      { name: 'Score' }
    ];

    const keyuser = '6thkQAv7FiV2UBUBcvQF95HVLJJ2';


    // this.historyService.games.valueChanges().subscribe(element => {
    //   console.log(element);
    // });

    let gamerByUSer = this.historyService.getGamesByUser(keyuser);
    console.log("filtro");
    console.log(gamerByUSer);


    // this.rows = gamerByUSer['data'];
    // console.log(gamerByUSer);








    // gamerByUSer.forEach(element => {
    //   // this.rows = element  
    //   console.log(element);

    // });
    // console.log(this.historyService.getGamesByUser(keyuser));

    // this.rows = this.historyService.getGamesByUser(keyuser);

    // this.httpClient.get<USERS>('../../assets/users.json')
    //   .subscribe((response) => {
    //     // console.log(response)
    //     this.rows = response.users;
    //   });
  }

  ngOnInit() { }
}