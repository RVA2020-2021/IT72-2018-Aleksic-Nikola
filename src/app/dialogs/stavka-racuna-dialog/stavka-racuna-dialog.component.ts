import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Racun } from 'src/app/models/racun';
import { Subscription } from 'rxjs';
import { Proizvod } from 'src/app/models/proizvod';
import { StavkaRacunaService } from 'src/app/services/stavka-racuna.service';
import { StavkaRacuna } from 'src/app/models/stavka-racuna';
import { RacunService } from 'src/app/services/racun.service';
import { ProizvodService } from 'src/app/services/proizvod.service';

@Component({
  selector: 'app-stavka-racuna-dialog',
  templateUrl: './stavka-racuna-dialog.component.html',
  styleUrls: ['./stavka-racuna-dialog.component.css']
})
export class StavkaRacunaDialogComponent implements OnInit, OnDestroy {

  flag: number;
  racuni: Racun[];
  proizvodi: Proizvod[];
  racunSubscription: Subscription;
  proizvodSubscription: Subscription;

  constructor(public stavkaRacunaService: StavkaRacunaService,
    public racunService: RacunService,
    public proizvodService: ProizvodService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaRacunaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StavkaRacuna) { }

  ngOnDestroy(): void {
    this.racunSubscription.unsubscribe();
    this.proizvodSubscription.unsubscribe();
  }

  ngOnInit(): void {
      this.proizvodSubscription=this.proizvodService.getAllProizvodi()
      .subscribe(proizvodi => {
        this.proizvodi=proizvodi;
      }),
      (error: Error) => {
        console.log(error.name+' '+error.message);
      }

  }

  compareTo(a,b){
    return a.id==b.id;
  }

  public add() : void {
    this.stavkaRacunaService.addStavkaRac(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodata stavka', 'OK', {duration:2500})
    }), (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja stavke', 'Zatvori', {duration:2500});
    };
}

public update() : void {
  this.stavkaRacunaService.updateStavkaRac(this.data).subscribe(() => {
    this.snackBar.open('Uspesno izmenjena stavka', 'OK', {duration:2500})
  }), (error: Error) => {
    console.log(error.name+' '+error.message);
    this.snackBar.open('Doslo je do greske prilikom izmene stavke', 'Zatvori', {duration:2500});
  };
}

public delete() : void {
  this.stavkaRacunaService.deleteStavkaRac(this.data.id).subscribe(() => {
    this.snackBar.open('Uspesno obrisana stavka', 'OK', {duration:2500})
  }), (error: Error) => {
    console.log(error.name+' '+error.message);
    this.snackBar.open('Doslo je do greske prilikom brisanja stavke', 'Zatvori', {duration:2500});
  };
}

public cancel(): void {
  this.dialogRef.close();
  this.snackBar.open('Odustali ste od izmene', 'Zatvori', {duration:1000});
}

}