import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { ProductI } from '../../model/product.interface';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  postProduct(product: ProductI): Observable<any> {
    return this.http.post<ProductI>('api/products/', product).pipe(
      tap((createdProduct: ProductI) => this.snackbar.open(`Product ${createdProduct.productname} created successfully`, 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['mat-toolbar', 'mat-accent']
      })),
      catchError(e => {
        this.snackbar.open(`Product could not be created, due to: ${e.error.message}`, 'Close', {
          duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['mat-toolbar', 'mat-warn']
        })
        return throwError(e);
      })
    )
  }



  
  getProduct(): Observable<any> {

    return this.http.get<any>(`api/products/`);


  }
  putProduct(product: ProductI, id: number): Observable<any> {

    return this.http.put<ProductI>('api/products/' + id, product).pipe(
      tap((updatedProduct: ProductI) => this.snackbar.open(`Product ${updatedProduct.productname} updated successfully`, 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['mat-toolbar', 'mat-primary']
      })),
      catchError(e => {
        this.snackbar.open(`Product could not be Updated, due to: ${e.error.message}`, 'Close', {
          duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['mat-toolbar', 'mat-warn']
        })
        return throwError(e);
      })
    )
  }

  deleteProduct(id: number, row: any): Observable<any> {
    return this.http.delete<ProductI>('api/products/' + id,).pipe(
      tap((deletedProduct: ProductI) => this.snackbar.open(`Product ID ${id} deleted successfully`, 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['mat-toolbar', 'mat-primary']
      })),
      catchError(e => {
        this.snackbar.open(`Product could not be Deleted, due to: ${e.error.message}`, 'Close', {
          duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['mat-toolbar', 'mat-warn']
        })
        return throwError(e);
      })
    )

  }

}
