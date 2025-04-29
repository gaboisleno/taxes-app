import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private entityUrl = '/public/supply';
  private apiUrl = environment.apiUrl + this.entityUrl;

  constructor(protected http: HttpClient) {}

  public findAll(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl);
  }

  public findById(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  public save(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, category);
  }
}
