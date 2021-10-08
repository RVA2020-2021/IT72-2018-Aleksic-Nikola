import { StavkaRacuna } from './../models/stavka-racuna';
import { STAV_RAC_URL, STAV_RAC_ZA_RAC_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StavkaRacunaService {

  constructor(private httpClient: HttpClient) { }

  public getStavkeZaRacun(idRacuna: number): Observable<any> {
    return this.httpClient.get(`${STAV_RAC_ZA_RAC_URL}/${idRacuna}`);
  }

  public addStavkaRac(stavkaRacuna: StavkaRacuna): Observable<any> {
    stavkaRacuna.id=5;
    return this.httpClient.post(`${STAV_RAC_URL}`, stavkaRacuna);
  }

  public updateStavkaRac(stavkaRacuna: StavkaRacuna): Observable<any> {
    return this.httpClient.put(`${STAV_RAC_URL}`, stavkaRacuna);
  }

  public deleteStavkaRac(id: number): Observable<any> {
    return this.httpClient.delete(`${STAV_RAC_URL}/${id}`);
  }
}