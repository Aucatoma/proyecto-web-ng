import {Component, Input, OnInit} from '@angular/core';
declare var $;

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() puntuacion;

  constructor() {
  }

  ngOnInit() {
    $('.ui.rating').rating({
      initialRating: this.puntuacion,
      maxRating: 5,
    });
    $('.ui.rating').rating('disable');
  }
}
