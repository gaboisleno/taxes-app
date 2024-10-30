import { HttpClient, HttpParams } from '@angular/common/http';
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

  /**
   * Retrieve all payments
   **/
  public findAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  /**
   * Find a payment by id.
   * @param Id - Payment Id
   **/
  public findById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Save or Update a payment.
   * @param Payment - Payment object
   **/
  public save(payment: any): Observable<any> {
    return this.http.post(this.apiUrl, payment);
  }

  /**
   * Delete one entity by id
   * @param Id - Payment Id
   **/
  public delete(paymentId: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${paymentId}`);
  }

  /**
   * Find entities by query
   * @param {Date} from - From date
   * @param {Date} to - To date
   **/
  public findBy(query: any): Observable<any> {
    const params = new HttpParams({ fromObject: query });
    return this.http.get(`${this.apiUrl}/query`, { params });
  }
}
