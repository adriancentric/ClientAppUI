import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductsFormComponent } from './pages/products-form/products-form.component';
import { CarsComponent } from './pages/cars/cars.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { CarFormComponent } from './pages/car-form/car-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  //Empty path -> send the user to /products
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },

  // /user renders UserComponent
  { 
    path: 'user', 
    component: UserComponent
  },

  // /products-form renders ProductsFormComponent
  {
    path: 'products-form',
    component: ProductsFormComponent
  },

  // /login renders LoginComponent
  {
    path: 'login',
    component: LoginComponent
  },

  // /register renders RegisterComponent
  {
    path: 'register',
    component: RegisterComponent
  },

  // /car-form renders CarFormComponent — protected by authGuard
  {
    path: 'car-form',
    component: CarFormComponent,
    canActivate: [authGuard]
  },

  // /cars renders CarsComponent
  {
    path: 'cars',
    component: CarsComponent,
    children: [
      // /cars/:id -> child route, ':id' is a route parameter
      {
        path: ':id',
        component: CarDetailsComponent
      }
    ]
  },

  // /products renders ProductsComponent
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      // /products/:id -> child route, ':id' is a route parameter
      {
        path: ':id',
        component: ProductDetailsComponent
      }
    ]
  },

  // Any unknown path -> NotFoundComponent
  {
    path: '**',
    component: NotFoundComponent
  }
];
