import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = `${environment.apiBaseUrl}/Apip/ws_line_customer`;
  private customerData: any = null;

  constructor(private http: HttpClient) {}

  setCustomerData(data: any): void {
    this.customerData = data;
    console.log("what is customerData", this.customerData);
  }

  getCustomerData(): any {
    return this.customerData;
  }

  clearCustomerData(): void {
    this.customerData = null;
  }

  checkCustomer(data: any): Observable<any> {
    const body = new HttpParams()
      .set('P_USERNAME', data.P_USERNAME)
      .set('P_LINE_USERID', data.P_LINE_USERID)
      .set('P_CONTACT_CODE', data.P_CONTACT_CODE)
      .set('P_MOBILE_NO', data.P_MOBILE_NO);

    return this.http.post(`${this.apiUrl}/check_customer/`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  register_information_details(data: any): Observable<any> {
    const body = new HttpParams()
      .set('P_USERNAME', data.P_USERNAME)
      .set('P_LINE_USERID', data.P_LINE_USERID)
      .set('P_REG_REF', data.P_REG_REF)

    return this.http.post(`${this.apiUrl}/register_info/`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  list_customer(data: any): Observable<any> {
    const body = new HttpParams()
      .set('P_USERNAME', data.P_USERNAME)
      .set('P_LINE_USERID', data.P_LINE_USERID)

    return this.http.post(`${this.apiUrl}/list_customer/`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  get_customer_information(data: any): Observable<any> {
    const body = new HttpParams()
      .set('P_USERNAME', data.P_USERNAME)
      .set('P_LINE_USERID', data.P_LINE_USERID)
      .set('P_ID', data.P_ID)

    return this.http.post(`${this.apiUrl}/get_customer_info/`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  unregister_customer(data: any): Observable<any> {
    const body = new HttpParams()
      .set('P_USERNAME', data.P_USERNAME)
      .set('P_LINE_USERID', data.P_LINE_USERID)
      .set('P_ID', data.P_CONTACT_CODE)

    return this.http.post(`${this.apiUrl}/unregister_customer/`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
}
