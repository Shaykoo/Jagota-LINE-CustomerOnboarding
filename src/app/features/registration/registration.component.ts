import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      customerCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  goOtpPage(){
    this.router.navigate(['/otp']);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const { customerCode, phoneNumber } = this.registrationForm.value;
      this.authService.sendOtp(customerCode, phoneNumber).subscribe(() => {
        this.router.navigate(['/otp']);
      });
    }
  }
}
