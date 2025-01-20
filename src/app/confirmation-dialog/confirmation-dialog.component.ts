import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/core/services/customer.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, 
              private customerService: CustomerService,
              private router: Router,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  unregisterCustomer(){
    let unregisterData ={
      P_USERNAME: this.data?.profileData?.CUST_CODE,
      P_LINE_USERID: 'U44a5a98bfed83382e70a7fdffcb2f4dc',
      P_ID: this.data?.profileData?.ID,
    }
    this.customerService.unregister_customer(unregisterData).subscribe({
      next: (response) => {
        console.log('Unregister customer:', response);
        // success message
      this.snackBar.open('Customer successfully unregistered.', 'Close', {
        duration: 3000, 
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
        this.dialogRef.close(true);
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.snackBar.open('Error unregistering.', 'Close', {
          duration: 3000, 
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.error('Error unregistering customer:', error);
      },
    });
  }
}
