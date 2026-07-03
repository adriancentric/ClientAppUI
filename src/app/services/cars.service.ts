import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Car } from '../models/car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  // Base URL for the .NET CarsController API.
  private readonly apiUrl = 'https://localhost:7080/api/cars';

  // Subject used to notify components that the cars list should be loaded again.
  private readonly carsChanged = new Subject<void>();

  // Expose the Subject as an Observable so components can listen, but cannot call next() directly.
  public readonly carsChanged$ = this.carsChanged.asObservable();

  constructor(private readonly http: HttpClient) {}

  // GET /api/cars - returns the full list of cars.
  getAllCars() {
    return this.http.get<Car[]>(this.apiUrl);
  }

  // GET /api/cars/:id - returns one car by id.
  getCarById(id: number) {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  // POST /api/cars - creates a new car, then tells the cars list to refresh.
  createCar(car: Car) {
    return this.http.post<Car>(this.apiUrl, car).pipe(
      // tap lets us run extra code after the HTTP call succeeds without changing the response.
      tap(() => this.carsChanged.next())
    );
  }

  // PUT /api/cars/:id - updates an existing car.
  updateCar(id: number, car: Partial<Car>) {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car);
  }

  // DELETE /api/cars/:id - deletes a car, then tells the cars list to refresh.
  deleteCar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      // After delete succeeds, emit an event so CarsComponent can call getAllCars() again.
      tap(() => this.carsChanged.next())
    );
  }
}