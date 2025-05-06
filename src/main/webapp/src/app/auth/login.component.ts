import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
  ],
  providers: [MessageService],
  template: `
    <p-toast></p-toast>

    <div
      class="d-flex justify-content-center align-items-center w-100"
      style="height: 100vh"
    >
      <form
        class="p-4 p-md-5 border rounded-3 card shadow"
        [formGroup]="form"
        (ngSubmit)="onSubmit()"
      >
        <div class="d-flex flex-column mb-3">
          <input
            pInputText
            id="username"
            formControlName="username"
            autocomplete="off"
            placeholder="Username"
            [disabled]="isLoading"
          />
        </div>

        <div class="d-flex flex-column mb-3">
          <input
            pInputText
            type="password"
            id="password"
            formControlName="password"
            autocomplete="off"
            placeholder="Password"
            [disabled]="isLoading"
          />
        </div>

        <div>
          <p-button
            type="submit"
            label="Login"
            styleClass="w-100"
            [disabled]="isLoading"
          />
          <hr class="my-4" />
          <small class="text-muted">
            By clicking Sign up, you agree to the terms of use.
          </small>
        </div>
      </form>
    </div>
  `,
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: MessageService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public ngOnInit(): void {}

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    const { username, password } = this.form.value;
    this.authService
      .login(username, password)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Username or password incorrect',
          });
        },
      })
      .add(() => (this.isLoading = false));
  }
}
