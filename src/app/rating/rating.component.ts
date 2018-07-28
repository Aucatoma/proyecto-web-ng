import {AfterViewInit, Component, OnInit} from '@angular/core';
declare var $;

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    $('.ui.rating').rating('disable');
  }


}
