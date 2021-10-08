import { ProizvodjacService } from './../../services/proizvodjac.service';
import { Proizvodjac } from './../../models/proizvodjac';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProizvodjacDialogComponent } from 'src/app/dialogs/proizvodjac-dialog/proizvodjac-dialog.component';

@Component({
  selector: 'app-proizvodjac',
  templateUrl: './proizvodjac.component.html',
  styleUrls: ['./proizvodjac.component.css']
})
export class ProizvodjacComponent implements OnInit {

  constructor(private proizvodjacService: ProizvodjacService,
    private dialog: MatDialog) { }

    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

ngOnDestroy(): void {
  this.subscription.unsubscribe;
}

displayedColumns = ['id', 'naziv', 'adresa','kontakt', 'actions'];
dataSource: MatTableDataSource<Proizvodjac>;
subscription:Subscription; 

ngOnInit(): void {
  this.loadData();
}

public loadData(){
   this.subscription=this.proizvodjacService.getAllProizvodjac()
      .subscribe(dataProizvodjac => {
          this.dataSource=new MatTableDataSource(dataProizvodjac);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      }),
      (error:Error) => {console.log(error.name+' '+error.message)}
}

public openDialog(flag:number,id?:number, naziv?:string, adresa?:string, kontakt?:string):void{
  const dialogRef=this.dialog.open(ProizvodjacDialogComponent, {data:{id, naziv,adresa,kontakt}});
  dialogRef.componentInstance.flag=flag;

  dialogRef.afterClosed().subscribe(res=>{
    if (res===1){
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