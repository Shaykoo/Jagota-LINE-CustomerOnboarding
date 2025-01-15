import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', 'white');
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
  }

}
