import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { timeMessage, successDialog, errorMessage } from 'src/app/functions/alerts';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.buildForm();
  }

  ngOnInit(): void {}

  register(): void {
    if (this.registerForm.invalid) {
      return Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      this.user = {
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value
      };
      this.userService.onSignUp(this.user).subscribe((data: any) => {
        if (data.status) {
          timeMessage('Signing up...', 1500).then(() => {
            successDialog('Sing in please.').then(() => {
              return this.router.navigate(['/login']);
            });
          });
        }
      }, error => {
        switch (error.error.errors[0].source.pointer) {
          case 'email':
            errorMessage('This email is already registered.');
            break;
          default:
            errorMessage('Error unexpected');
            break;
        }
      });
    }
  }

  get emailValidate() {
    return (
      this.registerForm.get('email').invalid &&
      this.registerForm.get('email').touched
    );
  }

  get passwordValidate() {
    return (
      this.registerForm.get('password').invalid &&
      this.registerForm.get('password').touched
    );
  }

  get password2Validate() {
    const password = this.registerForm.get('password').value;
    const password2 = this.registerForm.get('password2').value;

    return password === password2 ? false : true;
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
        ]
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
}
