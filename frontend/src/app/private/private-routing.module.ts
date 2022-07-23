import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddproductnavComponent } from './components/addproductnav/addproductnav.component';
import { ChartComponent } from './components/chart/chart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ShowtableComponent } from './components/showtable/showtable.component';
import { SmarttableComponent } from './components/smarttable/smarttable.component';
import { PrivateComponent } from './private.component';

const routes: Routes = [

  {
    path: '',
    component: PrivateComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'showtable', component: ShowtableComponent },
      { path: 'smarttable', component: SmarttableComponent },
      { path: 'addproductnav', component: AddproductnavComponent },
      { path: 'chart', component: ChartComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
