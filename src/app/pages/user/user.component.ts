import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { mustContainCentricDomain } from '../../shared/validators/validators';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  // Reactive form containing all user fields and their validators.
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('someone@gmail.com', [Validators.required, Validators.email, mustContainCentricDomain]),
    age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(65)]),
  });

  // Keep the subscription so we can clean it up in ngOnDestroy.
  private firstNameSub?: Subscription;

  ngOnInit(): void {
    // Get the firstName control from the form.
    const control = this.userForm.get('firstName');
    if (control) {
      // Listen for every firstName change and log the new value.
      this.firstNameSub = control.valueChanges.subscribe(value => {
        console.log('firstName valueChanges:', value);
      });
    }
  }

  // Getters make template validation checks shorter.
  get email(): FormControl {
    return this.userForm.get('email') as FormControl;
  }
  get lastName(): FormControl {
    return this.userForm.get('lastName') as FormControl;
  }

  onSubmit(): void {
    console.log('Submited form value:', this.userForm.value);
    console.log('Is firstName touched?: ', this.userForm.get('firstName')?.touched);
    console.log('firstName control value: ' , this.userForm.get('firstName')?.value);
    console.log('Is age control valid?: ', this.userForm.get('age')?.valid);
    console.log('Is email control valid?: ', this.userForm.get('email')?.valid);
    console.log('Is lastName control pristine?: ', this.userForm.get('lastName')?.pristine);
    console.log('Email control errors:', this.userForm.get('email')?.errors);
  }

  ngOnDestroy(): void {
    // Prevent memory leaks by unsubscribing when the component is destroyed.
    this.firstNameSub?.unsubscribe();
  }
}
