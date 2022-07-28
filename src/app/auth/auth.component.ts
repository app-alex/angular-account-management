import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public isLoginMode = true;
  public authForm!: FormGroup;
  public errors: string[] = [];

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null),
    });
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errors = [];
    this.authForm.reset();

    if (this.isLoginMode) {
      this.authForm.controls['confirmPassword'].clearValidators();
    } else {
      this.authForm.controls['confirmPassword'].addValidators([
        Validators.required,
        this.checkMatchPassword.bind(this),
      ]);
    }
  }

  public async onSubmit() {
    this.errors = [];

    if (this.authForm.invalid) {
      return;
    }

    const username = this.authForm.value.username;
    const password = this.authForm.value.password;

    if (this.isLoginMode) {
      try {
        await lastValueFrom(this.authService.signin(username, password));

        this.router.navigate(['/accounts']);
      } catch (error: any) {
        this.errors = error.error ? ['Wrong credentials'] : [];
      }
    } else {
      try {
        await lastValueFrom(this.authService.signup(username, password));
        await lastValueFrom(this.authService.signin(username, password));

        this.router.navigate(['/accounts']);
      } catch (error: any) {
        const errorMessage = error.error.message;

        this.errors =
          errorMessage instanceof Array ? errorMessage : [errorMessage];
      }
    }
  }

  checkMatchPassword(control: FormControl): { [s: string]: boolean } | null {
    const password = this.authForm ? this.authForm.value.password : null;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { notSame: true };
  }
}
