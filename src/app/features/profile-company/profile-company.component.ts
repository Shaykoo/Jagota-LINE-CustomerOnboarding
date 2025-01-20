import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss'],
})
export class ProfileCompanyComponent implements OnInit, OnDestroy {
  profileData: any;
  profileInfo: any;

  constructor(
    private renderer: Renderer2,
    private location: Location,
    private dialog: MatDialog,
    private router: Router,
    private customerService: CustomerService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.profileData = navigation?.extras.state?.['data'];

    if (!this.profileData) {
      const storedProfileData = localStorage.getItem('profileData');
      this.profileData = storedProfileData ? JSON.parse(storedProfileData) : null;
    }
  }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', 'white');
    console.log('Received data:', this.profileData);

    if (this.profileData) {
      localStorage.setItem('profileData', JSON.stringify(this.profileData));
      this.getProfileData();
    } else {
      console.error('Profile data is missing. Unable to fetch profile info.');
    }
  }

  getProfileData() {
    const data = {
      P_USERNAME: this.profileData?.CUST_CODE,
      P_LINE_USERID: 'U44a5a98bfed83382e70a7fdffcb2f4dc',
      P_ID: this.profileData?.ID,
    };
    console.log('Sending params', data);
    this.customerService.get_customer_information(data).subscribe({
      next: (response) => {
        console.log('Profile data:', response?.result[0]);
        this.profileInfo = response?.result[0];
      },
      error: (error) => {
        console.error('Error fetching profile data:', error);
      },
    });
  }

  onDeleteProfile() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { profileData: this.profileData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Account deletion confirmed');
        localStorage.removeItem('profileData');
      } else {
        console.log('Account deletion canceled');
      }
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
  }
}
