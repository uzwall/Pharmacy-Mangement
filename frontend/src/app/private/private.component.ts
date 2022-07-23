import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent  {
  


  constructor(private productService: ProductService){}


  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


  
}
