import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../../public/services/auth-service/auth.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  Expense_Content: number = 0;
  Revenue_Content: number = 0;
  Profit_Content: number = 0;
  Product_Content: number = 0;
  Expense: Array<number> = [];
  Sales: Array<number> = [];

  




  constructor(private productService: ProductService, private authService: AuthService) { }



  ngOnInit(): void {
    Chart.register(...registerables);

    this.getAllProducts()
    

   
  }







  getAllProducts() {

    this.productService.getProduct().subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.calculate();
      },
      error: (err) => {
        alert("Error while fetching the Records!!");
      }
    })
  }
  // sideBarOpen = true;

  // sideBarToggler() {
  //   this.sideBarOpen = !this.sideBarOpen;
  // }


  /** Based on the screen size, switch from standard to one column per row */






  calculate() {
    const list = this.dataSource.data;
    let data=0, data1=0 ,data2=0 ,data3=0,data4=0, data5=0;
    let sdata=0, sdata1=0 ,sdata2=0 ,sdata3=0,sdata4=0, sdata5=0;


    for (const i of list) {
      // this.Expense.push(parseInt(i.costprice));
      // this.Sales.push(parseInt(i.sellprice));

     

      this.Expense_Content += parseFloat(i.costprice);
      this.Revenue_Content += parseFloat(i.sellprice);
      const temp = parseFloat(i.sellprice) - parseFloat(i.costprice);
      this.Profit_Content += temp;
      // console.log(temp);
      this.Product_Content = this.dataSource.data.length;
      

      if( i.issuedate <='2017-01-01T00:00:00.000Z'){
       data += parseInt(i.costprice);
       sdata += parseInt(i.sellprice);
      }
      if( i.issuedate <='2018-01-01T00:00:00.000Z' && i.issuedate >'2017-01-01T00:00:00.000Z'){
        data1 += parseInt(i.costprice);
        sdata1 += parseInt(i.sellprice);
       }
       if( i.issuedate <='2019-01-01T00:00:00.000Z' && i.issuedate >'2018-01-01T00:00:00.000Z'){
        data2 += parseInt(i.costprice);
        sdata2 += parseInt(i.sellprice);
       }
       if( i.issuedate <='2020-01-01T00:00:00.000Z' && i.issuedate >'2019-01-01T00:00:00.000Z'){
        data3 += parseInt(i.costprice);
        sdata3 += parseInt(i.sellprice);
       }
       if( i.issuedate <='2021-01-01T00:00:00.000Z' && i.issuedate >'2020-01-01T00:00:00.000Z'){
        data4 += parseInt(i.costprice);
        sdata4 += parseInt(i.sellprice);
       }
       if( i.issuedate <='2022-01-01T00:00:00.000Z' && i.issuedate >'2021-01-01T00:00:00.000Z'){
        data5 += parseInt(i.costprice);
        sdata5 += parseInt(i.sellprice);
       }
    
    }
    this.Expense.push(data,data1,data2,data3,data4,data5);
    this.Sales.push(sdata,sdata1,sdata2,sdata3,sdata4,sdata5);
  
    const LineChart = new Chart('LineChart', {
      type: 'line',
      data: {
        labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
          {
            label: 'Expense',
            data: this.Expense,
            backgroundColor: 'red',
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Sales',
            data: this.Sales,
            backgroundColor: 'green',
            borderColor: 'green',
            fill: false,
          },
        ]
      },

    });


    const BarChart = new Chart('BarChart', {
      type: 'bar',
      data: {
        labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
          {
          label: 'Expenses',
          data:  this.Expense,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
           
          ],
          borderWidth: 1
        },
        {
          label: 'Sales',
          data:  this.Sales,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        },
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


    const PieChart = new Chart('PieChart', {
      type: 'doughnut',
      data: {
        labels: ['Expenses', 'Sales', 'Product'],
        datasets: [
        
          {
            label: 'My First Dataset',
            data: [this.Expense_Content, this.Revenue_Content, this.Product_Content],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }
        ]
      },

    });

    const RadarChart = new Chart('RadarChart', {
      type: 'radar',
      data: {
        labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
          label: 'Expenses',
          data: [data, data1, data2, data3, data4, data5],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'Sales',
          data: [sdata, sdata1, sdata2, sdata3, sdata4, sdata5],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },

    });

  }

}
