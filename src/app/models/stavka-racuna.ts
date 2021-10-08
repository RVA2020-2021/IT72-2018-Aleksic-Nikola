import { Proizvod } from './proizvod';
import { Racun } from './racun';
export class StavkaRacuna {
    id:number;
    kolicina: number;
    jedinicaMere: string;
    cena:number;
    redniBroj: number;
    racun:Racun;
    proizvod: Proizvod
}