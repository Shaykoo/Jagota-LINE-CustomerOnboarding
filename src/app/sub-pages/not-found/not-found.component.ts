import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', '#FFDBDB');
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
  }

  goToRegisterPage(){
    this.router.navigate(['/registration']);
  }
}
