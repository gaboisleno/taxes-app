import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private entityUrl = '/public/payment';
  private apiUrl = environment.apiUrl + this.entityUrl;

  constructor(protected http: HttpClient) {}

  public findAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  public findById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  public save(payment: any): Observable<any> {
    return this.http.post(this.apiUrl, payment);
  }

  public delete(payment: any): Observable<any> {
    return this.http.delete(this.apiUrl, payment);
  }

  public findByCreatedAt(query: any): Observable<any> {
    let params = {} as any;
    if (query.from) {
      params.from = query.from;
    }
    if (query.to) {
      params.to = query.to;
    }

    return this.http.get(`${this.apiUrl}/query`, { params });
  }
}
