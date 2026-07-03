import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CarsService } from '../../services/cars.service';
import { startWith, switchMap } from 'rxjs';
import { CarBrand } from '../../shared/enums/car-brand.enum';

@Component({
  selector: 'app-cars',
  imports: [CommonModule, RouterLink, RouterOutlet, MatCardModule, MatIconModule, MatListModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent {
  // Create the list of options used by the brand dropdown in the template.
  protected readonly carBrands = Object.values(CarBrand);

  // cars$ is an Observable. The template subscribes to it with the async pipe.
  protected readonly cars$;

  // Keep the currently selected brand. The default is All, so every car is visible.
  protected selectedBrand = CarBrand.All;

  constructor(private readonly carsService: CarsService) {
    // Load the cars when the component opens, then reload them whenever CarsService says the list changed.
    // This is useful after deleting or creating a car, because the parent CarsComponent is not recreated.
    this.cars$ = this.carsService.carsChanged$.pipe(
      // startWith triggers the first getAllCars() call immediately.
      startWith(undefined),
      // switchMap cancels the previous request if a new refresh happens and starts a new HTTP call.
      switchMap(() => this.carsService.getAllCars())
    );
  }

  // Read the selected value from the dropdown and store it in selectedBrand.
  protected onBrandChange(event: Event): void {
    this.selectedBrand = (event.target as HTMLSelectElement).value as CarBrand;
  }

  // Return true when the car should be displayed for the selected filter.
  protected isCarVisible(brand: string): boolean {
    return this.selectedBrand === CarBrand.All || brand.toLowerCase() === this.selectedBrand.toLowerCase();
  }
}