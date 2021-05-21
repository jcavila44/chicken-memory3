import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-five',
  templateUrl: './score-five.component.html',
  styleUrls: ['./score-five.component.scss'],
})
export class ScoreFiveComponent implements OnInit {
  data = [{name:'diego',score:99999},{name:'vivi',score:79999},{name:'devil',score:69999},{name:'carol',score:49999},{name:'jugadorx',score:39999}]
 
  constructor() { }

  ngOnInit() {}

}
