import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private customerService: CustomerService) {
    this.registrationForm = this.fb.group({
      customerCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      let customerData = {
        P_USERNAME: 'JBT04',
        P_LINE_USERID: 'U44a5a98bfed83382e70a7fdffcb2f4dc',
        P_CONTACT_CODE: this.registrationForm.value.customerCode,
        P_MOBILE_NO: this.registrationForm.value.phoneNumber,
      };
      
      this.customerService.setCustomerData(customerData);
      console.log("customerData", customerData);
  
      this.customerService.checkCustomer(customerData).subscribe({
        next: (response) => {
          console.log('Customer check successful:', response);
  
          const flag = response?.result[0]?.FLAG;
          localStorage.setItem('checkCustomer', JSON.stringify(response?.result[0]));
          console.log("flag", flag);
          switch (flag) {
            case "1":
              this.router.navigate(['/otp']);
              break;
            case "0":
              this.router.navigate(['/not-found']);
              break;
            case "2":
              this.router.navigate(['/already-exist']);
              break;
            default:
              console.error("Unexpected FLAG value:", flag);
          }
        },
        error: (error) => {
          console.error('Error checking customer:', error);
        },
      });
    }
  }
  
}

// const { customerCode, phoneNumber } = this.registrationForm.value;
      // this.authService.sendOtp(customerCode, phoneNumber).subscribe(() => {
      //   this.router.navigate(['/otp']);
      // });
