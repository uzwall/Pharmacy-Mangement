import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';



@Component({
  selector: 'app-smarttable',
  templateUrl: './smarttable.component.html',
  styleUrls: ['./smarttable.component.scss']
})
export class SmarttableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'productname', 'issuedate', 'expiredate', 'costprice', 'sellprice', 'quantity', 'desc', 'actions'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getAllProducts();

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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editProducts(row: any) {
    this.dialog.open(AddProductComponent, {
      width: '50%',
      data: row

    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllProducts()
      }
    })
  }

  deleteProduct(id: number, row : any) {
    this.productService.deleteProduct(id,row).subscribe({
      next: (res) => {
        this.getAllProducts();
      }
    });


  }

}



