import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}

  verifyOtp(otpCode: string) {
    return this.http.post('/api/verify-otp', { otpCode });
  }
}
