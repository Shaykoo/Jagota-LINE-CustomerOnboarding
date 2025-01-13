import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  sendOtp(customerCode: string, phoneNumber: string) {
    return this.http.post('/api/send-otp', { customerCode, phoneNumber });
  }
}
