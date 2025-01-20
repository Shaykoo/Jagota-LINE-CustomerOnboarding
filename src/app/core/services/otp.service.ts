import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  private apiUrl = `${environment.apiBaseUrl}/Apip/ws_line_customer`;
  // https://api-staging.jagota.com/Apip/ws_line_customer/check_otp_register/


  constructor(private http: HttpClient) {}

  // verifyOtp(otpCode: string) {
  //   return this.http.post('/api/verify-otp', { otpCode });
  // }

  verifyOtp(data: any): Observable<any> {
    const body = new HttpParams()
      .set('P_USERNAME', data.P_USERNAME)
      .set('P_LINE_USERID', data.P_LINE_USERID)
      .set('P_OTP', data.P_LINE_USERID)
      .set('P_CUST_CODE', data.P_CONTACT_CODE)
      .set('P_CONTACT_MOBILE', data.P_MOBILE_NO)
      .set('P_CUST_GROUP', data.P_MOBILE_NO)
      .set('P_CUST_GROUP_STATUS', data.P_MOBILE_NO)

    return this.http.post(`${this.apiUrl}/check_customer/`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
}
