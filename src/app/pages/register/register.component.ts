import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // Reactive form with username and password fields, both required.
  protected readonly registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] })
  });

  // Holds an error message to display when the API returns an error.
  protected errorMessage: string | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get username(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  protected onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, password } = this.registerForm.getRawValue();

    // Call the API, then navigate to /cars on success.
    this.authService.register(username, password).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: () => (this.errorMessage = 'Username already exists. Please choose a different one.')
    });
  }
}
