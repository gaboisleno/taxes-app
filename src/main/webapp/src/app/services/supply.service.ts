import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplyService {
  private entityUrl = '/public/supply';
  private apiUrl = environment.apiUrl + this.entityUrl;

  constructor(private http: HttpClient) {}

  public findAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  public findById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  public save(supply: any): Observable<any> {
    return this.http.post(this.apiUrl, supply);
  }

  public delete(supply: any): Observable<any> {
    return this.http.delete(this.apiUrl, supply);
  }
}
