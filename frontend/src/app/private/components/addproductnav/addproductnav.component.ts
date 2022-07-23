import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-addproductnav',
  templateUrl: './addproductnav.component.html',
  styleUrls: ['./addproductnav.component.scss']
})
export class AddproductnavComponent implements OnInit {
  productForm !: FormGroup;

  actionBtn: string = "Save"
  constructor(private formBuilder: FormBuilder, private productService: ProductService , private router: Router,
  ) { }

  ngOnInit(): void {
    this.productForm= this.formBuilder.group({
      productname: ['',Validators.required],
      issuedate:  ['',Validators.required],
      expiredate:  ['',Validators.required],
      costprice:  ['',Validators.required],
      sellprice:  ['',Validators.required],
      quantity:  ['',Validators.required],
      desc:  ['',Validators.required],
  
    })
  }

  addProduct() {
    if (this.productForm.valid) {
      this.productService.postProduct(this.productForm.value).pipe(tap(() => this.router.navigate(['../../private/addproductnav']))
      ).subscribe({
        next:(res)=>{
          this.productForm.reset();
        }
      });
    }

  }

}
