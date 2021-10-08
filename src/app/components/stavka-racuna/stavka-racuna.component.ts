import { Racun } from '../../models/racun';
import { MatDialog } from '@angular/material/dialog';
import { StavkaRacunaService } from '../../services/stavka-racuna.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Input, NgModule, OnChanges, OnInit, ViewChild } from '@angular/core';
import { StavkaRacuna } from 'src/app/models/stavka-racuna';
import { Proizvod } from 'src/app/models/proizvod';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { StavkaRacunaDialogComponent } from 'src/app/dialogs/stavka-racuna-dialog/stavka-racuna-dialog.component';

@Component({
  selector: 'app-stavka-racuna',
  templateUrl: './stavka-racuna.component.html',
  styleUrls: ['./stavka-racuna.component.css']
})
export class StavkaRacunaComponent implements OnInit, OnChanges {

  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena', 'proizvod', 'racun', 'actions'];
  dataSource: MatTableDataSource<StavkaRacuna>;
  subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() selektovaniRacun: Racun;

  constructor(private stavkaRacunaService: StavkaRacunaService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.selektovaniRacun);
    this.loadData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {
    if(this.selektovaniRacun.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.subscription = this.stavkaRacunaService.getStavkeZaRacun(this.selektovaniRacun.id)
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'proizvod' ? currentTerm + data.proizvod.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'proizvod': return data.proizvod.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  public openDialog(flag: number, id?: number, redniBroj?: number, kolicina?: number, jedinicaMere? :string, cena?: number, proizvod?: Proizvod, racun?: Racun) {
    const dialogRef = this.dialog.open(StavkaRacunaDialogComponent, {
      data: {id, redniBroj, kolicina, jedinicaMere, cena, proizvod, racun}
    });
    dialogRef.componentInstance.flag = flag;
    if(flag===1) {
      dialogRef.componentInstance.data.racun = this.selektovaniRacun;
    }
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result === 1) {
          this.loadData();
        }
      })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}