import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  public resourceUrl = '/public/payment';

  constructor(protected http: HttpClient) {}

  public findAll(): Observable<any> {
    return this.http.get<any>(this.resourceUrl);
  }

  public findById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/${id}`);
  }

  public save(payment: any): Observable<any> {
    return this.http.post(this.resourceUrl, payment);
  }

  public delete(payment: any): Observable<any> {
    return this.http.delete(this.resourceUrl, payment);
  }
}
