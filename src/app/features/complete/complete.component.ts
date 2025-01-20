import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2, private customerService: CustomerService, private router: Router) { }

  completeData: any;

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', 'white');
    this.get_register_information();
  }

  get_register_information() {
    let data = {
      P_USERNAME: 'JBT04',
      P_LINE_USERID: 'U44a5a98bfed83382e70a7fdffcb2f4dc',
      P_REG_REF: '20250109134949'
    }
    this.customerService.register_information_details(data).subscribe({
      next: (response) => {
        console.log('Register information details:', response);
        this.completeData = response?.result[0];
      },
      error: (error) => {
        console.error('Error fetching register information details:', error);
      },
    });
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
  }
}
