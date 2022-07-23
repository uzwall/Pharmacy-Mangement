import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from '../../services/user-service/user.service';
import { CustomValidators } from '../../_helpers/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  form: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email]),
    username: new UntypedFormControl(null, [Validators.required]),
    password: new UntypedFormControl(null, [Validators.required]),
    passwordConfirm: new UntypedFormControl(null, [Validators.required]),
  },
  {validators: CustomValidators.passwordsMatching});

  constructor( private userService : UserService, private router: Router) { }

  register(){
    if(this.form.valid){
      this.userService.create({
        email: this.email.value,
        password: this.password.value,
        username: this.username.value
      }).pipe(
        tap(()=> this.router.navigate(['../login']))
      ).subscribe();
    }

  }
  get email(): UntypedFormControl{
    return this.form.get('email')as UntypedFormControl
  }

  get username(): UntypedFormControl{
    return this.form.get('username')as UntypedFormControl
  }

  get password(): UntypedFormControl{
    return this.form.get('password')as UntypedFormControl
  }

  get passwordConfirm(): UntypedFormControl{
    return this.form.get('passwordConfirm')as UntypedFormControl
  }

  

}
