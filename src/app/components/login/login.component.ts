import { Component, EventEmitter } from "@angular/core";
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
  public loginEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  getEmailErrors = () => {
    if(this.email?.hasError('required')) {
      return 'Se requiere un email';
    }
    return this.email?.hasError('email') ? 'Email incorrecto' : '';
  };

  get password() {
    return this.loginForm.get('password');
  }

  getPasswordErrors = () => {
    if(this.password?.hasError('required')) {
      return 'Se requiere contraseña';
    }
    return '';
  };

  submit() {
    if (this.loginForm.valid) {
      const creds = this.loginForm.value as RequestAuth;
      // TODO: we must work with error
      this.service.login(creds).subscribe((user: User) => {
        this.loginEvent.emit();
        this.router.navigate(["/"]);
      });
    }
  }
}
