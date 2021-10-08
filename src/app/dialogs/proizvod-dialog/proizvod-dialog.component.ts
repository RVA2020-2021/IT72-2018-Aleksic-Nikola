
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { ProizvodjacService } from 'src/app/services/proizvodjac.service';
import { Proizvod } from 'src/app/models/proizvod';

@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit, OnDestroy {

  public flag: number;
  public proizvodjaci: Proizvodjac[];
  public subscription: Subscription;
  constructor(public proizvodService: ProizvodService,
    public proizvodjacService: ProizvodjacService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProizvodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proizvod) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription=this.proizvodjacService.getAllProizvodjac().subscribe(data => {
      this.proizvodjaci=data;
    }),
    (error: Error) => {
      console.log(error.name+' '+error.message);
    };
  }

  compareTo(a,b){
    return a.id==b.id;
  }

  public add() : void {
    this.proizvodService.addProizvod(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodata proizvod', 'OK', {duration:2500})
    }), (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja proizvoda', 'Zatvori', {duration:2500});
    };
}

public update() : void {
  this.proizvodService.updateProizvod(this.data).subscribe(() => {
    this.snackBar.open('Uspesno izmenjena proizvod', 'OK', {duration:2500})
  }), (error: Error) => {
    console.log(error.name+' '+error.message);
    this.snackBar.open('Doslo je do greske prilikom izmene proizvoda', 'Zatvori', {duration:2500});
  };
}

public delete() : void {
  this.proizvodService.deleteProizvod(this.data.id).subscribe(() => {
    this.snackBar.open('Uspesno obrisana proizvod', 'OK', {duration:2500})
  }), (error: Error) => {
    console.log(error.name+' '+error.message);
    this.snackBar.open('Doslo je do greske prilikom brisanja proizvoda', 'Zatvori', {duration:2500});
  };
}

public cancel(): void {
  this.dialogRef.close();
  this.snackBar.open('Odustali ste od izmene', 'Zatvori', {duration:1000});
}


}