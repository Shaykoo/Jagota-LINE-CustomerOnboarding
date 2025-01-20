import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { OtpService } from 'src/app/core/services/otp.service';
import { Location } from '@angular/common';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  otp: string[] = ['', '', '', '', '']; 
  reference = '123FB12';
  countdown = '03:59'; 
  customerData: any;

  otpErrorMessage = '';
  otpError = false;

  @ViewChildren('otp0, otp1, otp2, otp3, otp4') otpInputs!: QueryList<ElementRef>; 

  constructor(
    private otpService: OtpService,
    private location: Location,
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.getCustomerData(); 
    this.startCountdown();
  }

  getCustomerData() {
    this.customerData = this.customerService.getCustomerData();
  }

  startCountdown() {
    let seconds = 239;
    setInterval(() => {
      if (seconds > 0) {
        seconds--; // Decrement seconds
        this.countdown = `${Math.floor(seconds / 60)}:${('0' + (seconds % 60)).slice(-2)}`; // Format as MM:SS
      }
    }, 1000);
  }

  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
  
    if (!/^\d$/.test(input.value) && input.value !== '') {
      input.value = '';
      return;
    }
  
    this.otp[index] = input.value;
  
    if (input.value === '') {
      if (index > 0) {
        const prevInput = this.otpInputs.toArray()[index - 1];
        prevInput.nativeElement.focus();
        this.otpErrorMessage = '';
        this.otpError = false;
      }
    } else {
      if (index < this.otp.length - 1) {
        const nextInput = this.otpInputs.toArray()[index + 1];
        nextInput.nativeElement.focus();
      } else {
        if (this.otp.every(digit => digit !== '')) {
          this.onVerify();
        }
      }
    }
  }
  

  onVerify() {
    const otpCode = this.otp.join('');
    const otpDetails = {
      P_USERNAME: this.customerData?.P_USERNAME,
      P_LINE_USERID: 'U44a5a98bfed83382e70a7fdffcb2f4dc',
      P_OTP: otpCode,
      P_CUST_CODE: this.customerData?.P_CONTACT_CODE,
      P_CONTACT_MOBILE: this.customerData?.P_MOBILE_NO,
      P_CUST_GROUP: '',
      P_CUST_GROUP_STATUS: '',
    };

    console.log('Entered OTP:', otpDetails);

    this.otpService.verifyOtp(otpDetails).subscribe((res) => {
      console.log('OTP verified!', res);

      const flag = res?.result[0]?.FLAG;
      console.log("flag", flag);

      if (flag === '0') {
        this.otpErrorMessage = 'Wrong OTP, please try again';
        this.otpError = true;
      } else {
        this.otpErrorMessage = ''; 
        this.otpError = false;

        switch (flag) {
          case "1":
            this.router.navigate(['/complete']);
            break;
          case "-1":
            this.snackBar.open('OTP EXPIRED.', 'Close', {
              duration: 3000, 
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            setTimeout(() => {
              this.router.navigate(['/registration']);
            }, 2000);
            break;
            case "-2":
              this.snackBar.open('Not Registered, Something went wrong!', 'Close', {
                duration: 3000, 
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });            
              setTimeout(() => {
                this.router.navigate(['/registration']);
              }, 2000);
            break;
          default:
            console.error("Unexpected FLAG value:", flag);
        }
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
