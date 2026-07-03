import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly products = [
    {
      id: 1,
      name: 'keyboard',
      model: 'Logitech MX Keys Mini',
      createdDate: '2026-01-15',
      price: 89.99,
      rating: 5,
    },
    {
      id: 2,
      name: 'mouse',
      model: 'Logitech Master 3S',
      createdDate: '2026-02-08',
      price: 64.5,
      rating: 4,
    },
    {
      id: 3,
      name: 'monitor',
      model: 'Dell Ultrasharp 27',
      createdDate: '2025-11-21',
      price: 329.99,
      rating: 5,
    },
    {
      id: 4,
      name: 'headset',
      model: 'HyperX Cloud III S Wireless',
      createdDate: '2026-03-12',
      price: 74.25,
      rating: 3,
    },
    {
      id: 5,
      name: 'mousepad',
      model: 'Steelseries QcK Edge',
      createdDate: '2026-01-15',
      price: 21.99,
      rating: 4,
    },
    {
      id: 6,
      name: 'soundbar',
      model: 'Creative Stage V2',
      createdDate: '2026-02-08',
      price: 87.5,
      rating: 2,
    },
    {
      id: 7,
      name: 'mini-fridge',
      model: 'Cooluli Mini Fridge',
      createdDate: '2025-11-21',
      price: 734.99,
      rating: 3,
    },
    {
      id: 8,
      name: 'chair',
      model: 'DXRacer Formula Series',
      createdDate: '2026-03-12',
      price: 998.25,
      rating: 5,
    },
    {
      id: 9,
      name: 'microphone',
      model: 'Blue Yeti',
      createdDate: '2026-03-12',
      price: 129.99,
      rating: 2,
    },
    {
      id: 10,
      name: 'webcam',
      model: 'Logitech C920',
      createdDate: '2026-03-12',
      price: 34.99,
      rating: 3,
    },
    {
      id: 11,
      name: 'desklamp',
      model: 'Ikea Lamp',
      createdDate: '2026-03-12',
      price: 15.90,
      rating: 4,
    },
    {
      id: 12,
      name: 'graphics tablet',
      model: 'Wacom Intuos Pro',
      createdDate: '2026-03-12',
      price: 215.90,
      rating: 5,
    },
  ];

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }
}