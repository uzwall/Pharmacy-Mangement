import { Component, } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email]),
    password: new UntypedFormControl(null, [Validators.required]),

  })
  constructor(private authService: AuthService, private router: Router,) { } //router routes the path after login
  login() {
    if (this.form.valid) {
      this.authService.login({
        email: this.email.value,
        password: this.password.value
      }).pipe(tap(() => this.router.navigate(['../../private/dashboard']))
      ).subscribe();
    }
  }
  get email(): UntypedFormControl {
    return this.form.get('email') as UntypedFormControl;

  }
  get password(): UntypedFormControl {
    return this.form.get('password') as UntypedFormControl;

  }

 
  }

  
 

