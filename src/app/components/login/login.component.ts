import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RequestAuth } from "src/app/models/request-auth";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  submit() {
    if (this.loginForm.valid) {
      const creds = this.loginForm.value as RequestAuth;
      this.service.login(creds).subscribe((user: User) => {
        this.router.navigate(["/"]);
      });
    }
  }
}
