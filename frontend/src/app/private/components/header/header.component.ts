import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../public/services/auth-service/auth.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  content!: any;
  Expense_Content: number = 0;
  Revenue_Content: number = 0;
  Profit_Content: number = 0;
  Product_Content: number = 0;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  matBadge: any = '';
  displayElement: boolean = true; // it is whether to display element in html or not

  Display: Array<string> = [];  //it is a array type variable which store madge data

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService, private productService: ProductService) { }

  ngOnInit(): void {

    this.getAllProducts();

  }

  toggleSideBar() {
    this.toggleSidebarForMe.emit();

  }

  logout() {
    this.authService.logout();
  }

  getAllProducts() {

    this.productService.getProduct().subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.madge()
      },
      error: (err) => {
        alert("Error while fetching the Records!!");
      }
    })
  }

  madge() {
    const list = this.dataSource.data;
    this.matBadge = 0;
    this.Display.splice(0);


    for (const i of list) {

      

      if (i.quantity == 0 || i.expiredate <= formatDate(new Date(), 'yyyy-MM-dd', 'en_US')) {
        this.matBadge++;


        if (i.quantity == 0) {
          this.Display.push((i.productname).toUpperCase() + " is Empty");

        } else {



          this.Display.push((i.productname).toUpperCase() + " has  Expired !!");

        }
      }
      if (this.Display.length === 0) { this.displayElement = false; }

    }
    



  }

  


}
