import { Component, OnInit} from '@angular/core';
import { mustContainElectronicsInName } from '../../shared/validators/validators';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-form',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss',
})
export class ProductsFormComponent implements OnInit {
  // Reactive form for creating or testing product data.
    public productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.maxLength(10)]),
    value: new FormControl(10, [Validators.min(10), Validators.max(100)]),
    description: new FormControl(''),
    category: new FormControl('electronics', [Validators.required, mustContainElectronicsInName])
  });

  ngOnInit(): void {
    // Set an initial value so students can immediately see validation behavior.
    this.productForm.get('name')?.setValue('Nice product');
  }

  // Getters make the template validation checks shorter and easier to read.
  get name(): FormControl {
      return this.productForm.get('name') as FormControl;
  }

  get value(): FormControl {
      return this.productForm.get('value') as FormControl;
  }

  get category(): FormControl {
      return this.productForm.get('category') as FormControl;
  }

  onSubmit(): void {
    console.log('productForm value:', this.productForm.value);
    console.log('name control errors:', this.productForm.get('name')?.errors);
    console.log('value control errors:', this.productForm.get('value')?.errors);
  }
}
