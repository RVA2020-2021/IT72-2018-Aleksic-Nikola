import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodjacService } from 'src/app/services/proizvodjac.service';

@Component({
  selector: 'app-proizvodjac-dialog',
  templateUrl: './proizvodjac-dialog.component.html',
  styleUrls: ['./proizvodjac-dialog.component.css']
})
export class ProizvodjacDialogComponent implements OnInit {

  public flag: number;

  constructor(public proizvodjacService: ProizvodjacService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProizvodjacDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: Proizvodjac) { }

  ngOnInit(): void {
  }

  public addProizvodjac(): void {
    this.proizvodjacService.addProizvodjac(this.dataDialog).subscribe(() => {
      this.snackBar.open('Uspesno dodat proizvodjac: ' + this.dataDialog.naziv, 'OK', { duration: 2500 })
    }), (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja proizvodjaca', 'Zatvori', { duration: 2500 });
    };
  }

  public updateProizvodjac(): void {
    this.proizvodjacService.updateProizvodjac(this.dataDialog).subscribe(() => {
      this.snackBar.open('Uspesno izmenjen proizvodjac: ' + this.dataDialog.naziv, 'OK', { duration: 2500 })
    }), (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom izmene proizvodjaca', 'Zatvori', { duration: 2500 });
    };
  }

  public deleteProizvodjac(): void {
    this.proizvodjacService.deleteProizvodjac(this.dataDialog.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisan proizvodjac: ' + this.dataDialog.naziv, 'OK', { duration: 2500 })
    }), (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja proizvodjaca', 'Zatvori', { duration: 2500 });
    };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene', 'Zatvori', { duration: 1000 });
  }

}