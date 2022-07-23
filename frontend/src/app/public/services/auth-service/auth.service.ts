import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import {   catchError, tap } from 'rxjs/operators';

import { LoginResponseI } from '../../../model/login-response.interface';
import { UserI } from '../../../model/user.interface';
import { LoginComponent } from '../../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ,private snackbar: MatSnackBar,private jwtService: JwtHelperService, private router: Router) { }

  login(user: UserI): Observable<LoginResponseI>{
    return this.http.post<LoginResponseI>('api/users/login', user).pipe(
      tap((res: LoginResponseI)=>localStorage.setItem('uzwal_login',res.access_token)),tap(()=> this.snackbar.open("Login Successful", "OK", {
        duration: 3000,
        horizontalPosition: 'right', verticalPosition: 'top',
        panelClass: ['mat-toolbar','mat-primary'],
      })
      ),
      catchError(e => {
        this.snackbar.open(`Error , due to: ${e.error.message}`, 'Close', {
          duration: 3000, horizontalPosition: 'right', verticalPosition: 'top', 
          panelClass: ['mat-toolbar', 'mat-warn']
        })
        return throwError(e);
      })
    );
  }

  logout() {
    localStorage.removeItem('uzwal_login');
    this.router.navigate(['/public/login']);
  }
}
