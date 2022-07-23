import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { AddProductComponent } from './components/add-product/add-product.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PrivateComponent } from './private.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { ShowtableComponent } from './components/showtable/showtable.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { SmarttableComponent } from './components/smarttable/smarttable.component';
import { AddproductnavComponent } from './components/addproductnav/addproductnav.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { ChartComponent } from './components/chart/chart.component';





@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    AddProductComponent,
    PrivateComponent,
    ShowtableComponent,
    SmarttableComponent,
    AddproductnavComponent,
    ChartComponent,
 

  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatDialogModule,
    MatButtonModule,

  // * MATERIAL IMPORTS
     MatSidenavModule,
     MatToolbarModule,
     MatMenuModule,
     MatIconModule,
     MatDividerModule,
     MatListModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    
    
    
    
  

  ]
})
export class PrivateModule { }
