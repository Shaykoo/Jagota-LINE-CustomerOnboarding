import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-already-exist',
  templateUrl: './already-exist.component.html',
  styleUrls: ['./already-exist.component.scss']
})
export class AlreadyExistComponent implements OnInit, OnDestroy{

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', 'white');
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
  }

}