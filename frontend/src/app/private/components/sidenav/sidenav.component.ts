import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( private dialog: MatDialog, private productService : ProductService , ) { }

  ngOnInit(): void {
    
  }
  openDialog() {
    this.dialog.open(AddProductComponent, { 
      width: '50%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllProducts();
      }
    })
  }
  getAllProducts() {
    this.productService.getProduct().subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching the Records!!");
      }
    })
  }



}



