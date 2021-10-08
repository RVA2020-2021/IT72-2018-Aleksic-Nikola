import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROI_URL } from '../app.constants';
import { Proizvodjac } from '../models/proizvodjac';

@Injectable({
  providedIn: 'root'
})
export class ProizvodjacService {

  constructor(private httpClient: HttpClient) { }

  public getAllProizvodjac(): Observable<any> {
    return this.httpClient.get(`${PROI_URL}`);
  }

  public addProizvodjac(proizvodjac: Proizvodjac): Observable<any> {
    proizvodjac.id=5;
    return this.httpClient.post(`${PROI_URL}`, proizvodjac);
  }

  public updateProizvodjac(proizvodjac: Proizvodjac): Observable<any> {
    return this.httpClient.put(`${PROI_URL}`, proizvodjac);
  }

  public deleteProizvodjac(id: number): Observable<any> {
    return this.httpClient.delete(`${PROI_URL}/${id}`);
  }
}