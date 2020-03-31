import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}

  register(): void {
    if (this.registerForm.invalid) {
      return Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      console.log("Register");
    }
  }

  get emailValidate() {
    return (
      this.registerForm.get("email").invalid &&
      this.registerForm.get("email").touched
    );
  }

  get passwordValidate() {
    return (
      this.registerForm.get("password").invalid &&
      this.registerForm.get("password").touched
    );
  }

  get password2Validate() {
    const password = this.registerForm.get("password").value;
    const password2 = this.registerForm.get("password2").value;

    return password === password2 ? false : true;
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
        ]
      ],
      password: ["", [Validators.required, Validators.minLength(5)]],
      password2: ["", [Validators.required, Validators.minLength(5)]]
    });
  }
}
