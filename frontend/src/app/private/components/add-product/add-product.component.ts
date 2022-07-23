import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';





@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  //   providers: [
  //     { provide: MAT_DIALOG_DATA, useValue: {} },
  //     { provide: MatDialogRef, useValue: {} }

  // ]

})
export class AddProductComponent implements OnInit {


  actionBtn: string = "Save"


  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,

    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddProductComponent>

  ) { }
  ngOnInit(): void {


    // console.log(this.editData);
    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['productname'].setValue(this.editData.productname);
      this.productForm.controls['issuedate'].setValue(this.editData.issuedate);
      this.productForm.controls['expiredate'].setValue(this.editData.expiredate);
      this.productForm.controls['costprice'].setValue(this.editData.costprice);
      this.productForm.controls['sellprice'].setValue(this.editData.sellprice);
      this.productForm.controls['quantity'].setValue(this.editData.quantity);
      this.productForm.controls['desc'].setValue(this.editData.desc);

    }


  }

  productForm: UntypedFormGroup = new UntypedFormGroup({

    productname:  new UntypedFormControl(null, [Validators.required]),
    issuedate:  new UntypedFormControl(null, [Validators.required]),
    expiredate:  new UntypedFormControl(null, [Validators.required]),
    costprice:  new UntypedFormControl(null, [Validators.required]),
    sellprice:  new UntypedFormControl(null, [Validators.required]),
    quantity:  new UntypedFormControl(null, [Validators.required]),
    desc:  new UntypedFormControl(null, [Validators.required]),

  })


  updateProduct() {
    this.productService.putProduct(this.productForm.value, this.editData.id).pipe(tap(() => this.router.navigate(['../../private/smarttable']))
    ).subscribe({
      next:(res)=>{
        this.productForm.reset();
        this.dialogRef.close('update')
      }
    });

  }


  addProduct() {

    if (!this.editData) {
    console.log(this.productForm.value);
    if (this.productForm.valid) {
      this.productService.postProduct(this.productForm.value).pipe(tap(() => this.router.navigate(['../../private/addproductnav']))
      ).subscribe({
        next: (res) => {
          this.productForm.reset();
          this.dialogRef.close('save');
        }
      });
    }

    } else {
      this.updateProduct();
    }
  }

 



}
