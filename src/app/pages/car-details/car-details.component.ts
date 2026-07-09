import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { map, switchMap } from 'rxjs';
import { CarsService } from '../../services/cars.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-car-details',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent {
  // car$ is an Observable that emits the selected car from the API.
  protected readonly car$;

  protected readonly isUserRole: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly carsService: CarsService,
    private readonly authService: AuthService
  ) {
    this.isUserRole = this.authService.isUserRole();

    // Read the id from the /cars/:id route, then request that car from CarsService.
    this.car$ = this.route.params.pipe(
      // Convert the route parameter from string to number.
      map(params => Number(params['id'])),
      // Use the id to call the API. If the route id changes, this runs again.
      switchMap(id => this.carsService.getCarById(id))
    );
  }

  // Sends an update request to the API. Currently it sends an empty update object.
  updateCar(id: number): void {
    this.carsService.updateCar(id, {}).subscribe();
  }

  // Deletes the selected car, then navigates back to the cars list.
  deleteCar(id: number): void {
    this.carsService.deleteCar(id).subscribe(() => {
      this.router.navigate(['/cars']);
    });
  }
}