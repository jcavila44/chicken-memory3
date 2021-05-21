import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';


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


  constructor(private httpClient: HttpClient
  ) {

    this.col = [
      { name: 'Name' },
      { name: 'Username' },
      { name: 'email' }
    ];

    this.httpClient.get<USERS>('../../assets/users.json')
      .subscribe((response) => {
        console.log(response)
        this.rows = response.users;
      });
  }

  ngOnInit() { }


}
