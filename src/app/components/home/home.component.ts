import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public splash = '../../assets/img/gif/chicken1.gif';
  public title = '../../assets/img/gif/title.gif';
  
  constructor(public router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['app-registro-usuario'])
    }, 5000)
  }
}
