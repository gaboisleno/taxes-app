import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SupplyService {
    public resourceUrl = "/public/supply";

    constructor(private http: HttpClient) {}

    public findAll(): Observable<any> {
        return this.http.get<any>(this.resourceUrl);
    }

    public findById(id: number | string): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/${id}`);
    }

    public save(supply: any): Observable<any> {
        return this.http.post(this.resourceUrl, supply);
    }

    public delete(supply: any): Observable<any> {
        return this.http.delete(this.resourceUrl, supply);
    }
}