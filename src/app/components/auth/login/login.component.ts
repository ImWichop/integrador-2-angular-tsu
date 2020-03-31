import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      console.log("LogIn");
    }
  }

  get emailValidate() {
    return (
      this.loginForm.get("email").invalid && this.loginForm.get("email").touched
    );
  }

  get passwordValidate() {
    return (
      this.loginForm.get("password").invalid &&
      this.loginForm.get("password").touched
    );
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
        ]
      ],
      password: ["", [Validators.required, Validators.minLength(5)]]
    });
  }
}
