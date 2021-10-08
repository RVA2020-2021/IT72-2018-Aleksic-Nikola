import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RacunService } from 'src/app/services/racun.service';
import { Racun } from 'src/app/models/racun';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {

  public flag: number;

  constructor(public racunService: RacunService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RacunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: Racun) { }

  ngOnInit(): void {
  }

  public addRacun() : void {
      this.racunService.addRacun(this.dataDialog).subscribe(() => {
        this.snackBar.open('Uspesno dodat racun: '+this.dataDialog.id, 'OK', {duration:2500})
      }), (error: Error) => {
        console.log(error.name+' '+error.message);
        this.snackBar.open('Doslo je do greske prilikom dodavanja racuna', 'Zatvori', {duration:2500});
      };
  }

  public updateRacun() : void {
    this.racunService.updateRacun(this.dataDialog).subscribe(() => {
      this.snackBar.open('Uspesno izmenjen racun: '+this.dataDialog.id, 'OK', {duration:2500})
    }), (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom izmene racuna', 'Zatvori', {duration:2500});
    };
  }

  public deleteRacun() : void {
    this.racunService.deleteRacun(this.dataDialog.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisan racun: '+this.dataDialog.id, 'OK', {duration:2500})
    }), (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja racuna', 'Zatvori', {duration:2500});
    };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene', 'Zatvori', {duration:1000});
  }

}