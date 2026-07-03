import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Car } from '../../models/car.interface';
import { CarsService } from '../../services/cars.service';
import { CarBrand } from '../../shared/enums/car-brand.enum';

@Component({
  selector: 'app-car-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.scss'
})
export class CarFormComponent implements OnInit {
  // Brand dropdown options come from the CarBrand enum, excluding the "All" filter option.
  protected readonly brandOptions = Object.values(CarBrand).filter(brand => brand !== CarBrand.All);

  // Reactive form that represents the fields needed to create a new car.
  protected readonly carForm = new FormGroup({
    // Id is disabled in the UI, but getRawValue() still includes it on submit.
    id: new FormControl({ value: 1, disabled: true }, { nonNullable: true }),
    brand: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    model: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    year: new FormControl(new Date().getFullYear(), { nonNullable: true, validators: [Validators.required, Validators.min(1886)] }),
    price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    color: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(
    private readonly carsService: CarsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // Load all cars so we can calculate the next id before the user submits the form.
    this.carsService.getAllCars().subscribe(cars => {
      // If there are no cars, highestId is 0. Otherwise, use the biggest existing id.
      const highestId = cars.length ? Math.max(...cars.map(car => car.id)) : 0;

      // The new car id is one higher than the current highest id.
      this.carForm.controls.id.setValue(highestId + 1);
    });
  }

  // These getters make the template validation checks easier to read.
  get brand(): FormControl {
    return this.carForm.get('brand') as FormControl;
  }

  get model(): FormControl {
    return this.carForm.get('model') as FormControl;
  }

  get year(): FormControl {
    return this.carForm.get('year') as FormControl;
  }

  get price(): FormControl {
    return this.carForm.get('price') as FormControl;
  }

  get color(): FormControl {
    return this.carForm.get('color') as FormControl;
  }

  protected onSubmit(): void {
    // Stop if any validator fails.
    if (this.carForm.invalid) {
      return;
    }

    // getRawValue() includes disabled controls, so the disabled id is included here.
    const car = this.carForm.getRawValue() as Car;

    // POST the new car, then navigate to the details page for the created car.
    this.carsService.createCar(car).subscribe(createdCar => {
      this.router.navigate(['/cars', createdCar.id]);
    });
  }
}