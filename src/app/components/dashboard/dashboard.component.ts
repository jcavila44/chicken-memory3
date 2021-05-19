import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardComponent implements OnInit {

  public cardsTotal = 12;	// Total tarjetas (divididas por 2)
  public cardsArray = [];	// Almacen de pares de tarjetas
  public userLife = 5;		// Total amount of tries user gets
  public imageDir = '../../assets/img/fruits/';
  public images = ['apple', 'strawberry', 'apple-green', 'cherry', 'grape-green', 'grape-purple', 'peach', 'pear'];

  public selectCard1pos = -1;	// Selección tarjeta #1 posición
  public selectCard1val = -1;	// Selección tarjeta #1 valor
  public selectCard2pos = -1;	// Selección tarjeta #2 posición
  public selectCard2val = -1;	// Selección tarjeta #2 valor
  public selectOldPosix = -1; // Alamacen de posiciones

  public debugText = "Mensaje de prueba"

  constructor() { }

  ngOnInit() {
    this.restartGame();
  }

  populateCards() {
  	this.cardsArray = [];
  	var x = 0;
  	var y = 0;
  	for (var i = 0; i < this.cardsTotal; i++) {
  		this.cardsArray.push({pos:i, val:y});
  		if (x == 0) x = 1;
  		else { x = 0; y++ }
  	}
  }

  selectCard(pos, val, i) {
    var actOne = false;

    if (this.selectCard1pos > -1 && this.selectCard2pos == -1) {
      this.selectCard2pos = pos;
  	  this.selectCard2val = val;

      actOne = true;
    }

    if (this.selectCard1pos == -1 && !actOne) {
      this.selectCard1pos = pos;
  	  this.selectCard1val = val;    
      this.selectOldPosix = i;  
    }

    if (this.selectCard1pos > -1 && this.selectCard2pos > -1) {
      setTimeout(() => {
        if (this.selectCard1val == this.selectCard2val) {
          this.debugText = "pareja encontrada";
          this.cardsArray.splice(this.selectOldPosix, 1, {pos: this.selectOldPosix, val: -1});
          this.cardsArray.splice(i, 1, {pos: i, val: -1});
          this.resetSelects();
        } else {
          this.debugText = "Sigue intentando";
          this.userLife -= 1;
          this.resetSelects();

          if (this.userLife <= 0) this.restartGame();
        }
      }, 1000)
    }
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
  }

  restartGame() {
    this.userLife = 5;
    this.resetSelects();
    this.populateCards();
    this.shuffle(this.cardsArray);
  	this.shuffle(this.images);
  }

  resetSelects() {
		this.selectCard1pos = -1;	// Selected card #1 position
    this.selectCard1val = -1;	// Selected card #1 value
    this.selectCard2pos = -1;	// Selected card #2 position
    this.selectCard2val = -1;	// Selected card #2 value
	}
}