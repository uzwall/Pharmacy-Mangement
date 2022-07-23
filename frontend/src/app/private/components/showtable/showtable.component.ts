import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-showtable',
  templateUrl: './showtable.component.html',
  styleUrls: ['./showtable.component.scss']
})
export class ShowtableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'productname', 'issuedate', 'expiredate', 'costprice', 'sellprice', 'quantity', 'desc'];

  dataSource!: MatTableDataSource<any>;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
   

  }
  

  getAllProducts() {
    this.productService.getProduct().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching the Records!!");
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}



