import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatCardModule,
    MatListModule,
    MatIconModule    
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  // Products are loaded from the local ProductsService and displayed by the template.
  public readonly products;

  constructor(private readonly productsService: ProductsService) {
    // getProducts() returns the array used to build the product links.
    this.products = this.productsService.getProducts();
  }
}
