import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-already-exist',
  templateUrl: './already-exist.component.html',
  styleUrls: ['./already-exist.component.scss']
})
export class AlreadyExistComponent implements OnInit, OnDestroy{

  constructor(private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', 'white');
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
  }

  goToRegisterPage(){
    this.router.navigate(['/registration']);
  }

}
