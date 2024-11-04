import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {StringHelper} from "../shared/helpers/string-helper";
import {LoginModel} from "../shared/api/models/request/login-model";
import {AuthService} from "../shared/services/auth.service";
import {catchError, map, of, switchMap} from "rxjs";
import {AppError} from "../shared/errors/app-error";
import {SchoolService} from "../shared/api/school.service";
import {StringResponseModel} from "../shared/api/models/response/string-response-model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  schoolName!: string;
  error: string | undefined;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    saveCredentials: new FormControl(false, Validators.required)
  });

  constructor(private authService: AuthService, private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.schoolService.getLocalSchoolName().pipe(map((response: StringResponseModel) => {
      if (!StringHelper.isNullOrWhitespace(response.value)) {
        this.schoolName = response.value;
      }
      else {
        this.schoolName = 'Welcome!'
      }
    })).subscribe();
  }

  get username(): AbstractControl {
    return this.loginForm.get('username')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  get saveCredentials(): AbstractControl {
    return this.loginForm.get('saveCredentials')!;
  }

  get showError(): boolean {
    return !StringHelper.isNullOrWhitespace(this.error);
  }

  get currentDate(): Date {
    return new Date();
  }

  login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      let loginModel: LoginModel = {
        username: this.username!.value,
        password: this.password!.value,
        saveCredentials: this.saveCredentials.value
      }
      this.authService.login(loginModel).pipe(switchMap((result: boolean) => {
        if (result) {
          this.error = '';
          return this.authService.redirectToHome();
        }
        else {
          this.error = 'An error occurred during login.';
          return of(false);
        }
      }), catchError((error: AppError) => {
        this.error = error.errorMessage;
        return of(false);
      })).subscribe();
    }
  }
}
