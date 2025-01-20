import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  listData: any;
  constructor(private renderer: Renderer2, private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', '#FBF8FD');
    this.getListCustomer()
  }

  getListCustomer(){
    let data ={
      P_USERNAME: 'JBT04',
      P_LINE_USERID: 'U44a5a98bfed83382e70a7fdffcb2f4dc'
    }
    this.customerService.list_customer(data).subscribe({
      next: (response) => {
        console.log('Profile data:', response);
        this.listData = response?.result;
      },
      error: (error) => {
        console.error('Error fetching profile data:', error);
      },
    }); 
  }

  goToCompanyProfile(listData: any){
    this.router.navigate(['/profile-company'], { state: { data: listData } });
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
  }

}
