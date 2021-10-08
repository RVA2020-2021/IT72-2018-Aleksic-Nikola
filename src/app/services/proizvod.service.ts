import { PRO_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proizvod } from '../models/proizvod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {

  constructor(private httpClient: HttpClient) { }

  public getAllProizvodi(): Observable<any> {
    return this.httpClient.get(`${PRO_URL}`);
  }

  public addProizvod(proizvod: Proizvod): Observable<any> {
    proizvod.id=5;
    return this.httpClient.post(`${PRO_URL}`, proizvod);
  }

  public updateProizvod(proizvod: Proizvod): Observable<any> {
    return this.httpClient.put(`${PRO_URL}`, proizvod);
  }

  public deleteProizvod(id: number): Observable<any> {
    return this.httpClient.delete(`${PRO_URL}/${id}`);
  }
}