import {AfterViewInit, Component, OnInit} from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit, AfterViewInit {
  content;

  ngAfterViewInit(): void {
  }

  constructor() {
  }

  ngOnInit() {
  }


}
