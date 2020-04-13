import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { successDialog, warningMessage, timeMessage, errorMessage } from '../../../functions/alerts';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService) {
    this.buildForm();
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      this.user = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      };
      this.authService.onLogin(this.user).subscribe((data: any) => {
        timeMessage('Logining...', 1500).then(() => {
          if (data) {
            successDialog('Welcome').then(() => {
              this.authService.setToken(data.token);
              return this.router.navigate(['/home']);
            });
          }
        });
      }, error => {
        switch (error.error[0].field) {
          case 'email':
              errorMessage('El correo es invalido');
              break;
          case 'password':
              errorMessage('La contraseña es incorrecta');
              break;
        }

      });
    }
  }

  get emailValidate() {
    return (
      this.loginForm.get('email').invalid && this.loginForm.get('email').touched
    );
  }

  get passwordValidate() {
    return (
      this.loginForm.get('password').invalid &&
      this.loginForm.get('password').touched
    );
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
        ]
      ],
      password: ['', [Validators.required]]
    });
  }
}
