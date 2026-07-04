import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // Reactive form with username and password fields, both required.
  protected readonly loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  // Holds an error message to display when the API returns an error.
  protected errorMessage: string | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    // Call the API, then navigate to /cars on success.
    this.authService.login(username, password).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: () => (this.errorMessage = 'Invalid username or password. Please try again.')
    });
  }
}
