import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from '../../services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  // productDetails is a Signal created from the route params Observable.
  protected readonly productDetails;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService
  ) {
    // Convert the changing /products/:id route parameter into a signal for the template.
    this.productDetails = toSignal(
      this.route.params.pipe(
        map(params => {
          // Route params are strings, so convert id to a number before searching.
          const id = Number(params['id']);

          return {
            id,
            // Find the matching product from ProductsService.
            product: this.productsService.getProductById(id)
          };
        })
      ),
      {
        // Initial value prevents the template from reading undefined before the route emits.
        initialValue: {
          id: 0,
          product: undefined
        }
      }
    );
  }
}
