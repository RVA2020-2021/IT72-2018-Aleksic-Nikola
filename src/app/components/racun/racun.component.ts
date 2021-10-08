import { RacunService } from './../../services/racun.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Racun } from 'src/app/models/racun';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RacunDialogComponent } from 'src/app/dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'datum', 'nacinPlacanja', 'actions'];
  dataSource: MatTableDataSource<Racun>;
  subscription: Subscription;

  selektovaniRacun: Racun;
  racunSubscription: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private racunService: RacunService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData() {
    this.racunSubscription = this.racunService.getAllRacuni()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  selectRow(row: any) {
    console.log(row);
    this.selektovaniRacun = row;
    console.log(this.selektovaniRacun);
  }

  public openDialog(flag: number, id?: number, datum?: Date, nacin_placanja?: string) {
    const dialogRef = this.dialog.open(RacunDialogComponent, {data: {id, datum, nacin_placanja}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result===1) {
          this.loadData();
        }
      })
  }

  applyFilter(filterValue: string) {
  
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  
  }


}