import { Component, OnInit } from '@angular/core';
import { OtpService } from 'src/app/core/services/otp.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  otp: string[] = ['', '', '', '', '', ''];
  reference = '123FB12';
  countdown = '03:59';

  constructor(private otpService: OtpService) {}

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    let seconds = 239;
    setInterval(() => {
      if (seconds > 0) {
        seconds--;
        this.countdown = `${Math.floor(seconds / 60)}:${('0' + (seconds % 60)).slice(-2)}`;
      }
    }, 1000);
  }

  onVerify() {
    const otpCode = this.otp.join('');
    this.otpService.verifyOtp(otpCode).subscribe((res) => {
      console.log('OTP verified!', res);
    });
  }
}
