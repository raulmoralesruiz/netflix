import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SelectI } from 'src/app/interfaces/select';
import { ProductI } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {
    console.log('servicio admin funcionando');
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Se definen las categorías
  private category: SelectI[] = [
    {
      id: 1,
      value: 'SCIFI',
      name: 'Sci-Fi',
    },
    {
      id: 2,
      value: 'DRAMA',
      name: 'Drama',
    },
    {
      id: 3,
      value: 'TERROR',
      name: 'Terror',
    },
    {
      id: 4,
      value: 'ACTION',
      name: 'Action',
    },
    {
      id: 5,
      value: 'COMEDY',
      name: 'Comedy',
    },
  ];

  // Se definen los tipos de contenido
  private contentType: SelectI[] = [
    {
      id: 1,
      value: 'MOVIE',
      name: 'Movie',
    },
    {
      id: 2,
      value: 'SERIE',
      name: 'Serie',
    },
  ];

  // Se definen los tipos de suscripciones
  private subscriptionType: SelectI[] = [
    {
      id: 1,
      value: 'BASIC',
      name: 'Basic',
    },
    {
      id: 2,
      value: 'PREMIUM',
      name: 'Premium',
    },
  ];

  // Método para obtener las categorias definidas
  getCategories(): SelectI[] {
    return this.category;
  }

  // Método para obtener los tipos de contenido definidos
  getContentType(): SelectI[] {
    return this.contentType;
  }

  // Método para obtener los tipos de suscripciones definidos
  getSubscriptionType(): SelectI[] {
    return this.subscriptionType;
  }

  // Método para crear producto, realizando POST
  createProduct(product: ProductI): Observable<ProductI> {
    const endpoint = 'http://localhost:8080/netflix/products/';

    return this.http.post<ProductI>(endpoint, product, this.httpOptions);
    // .pipe(catchError(this.handleError('createProduct', product)));
  }

  // Obtener nombres de usuario
  getCustomers(): Observable<any> {
    const endpoint = 'http://localhost:8080/netflix/customer';

    return this.http.get(endpoint).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // Obtener nombres de usuario
  getProducts(): Observable<any> {
    const endpoint = 'http://localhost:8080/netflix/products/';

    return this.http.get(endpoint).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // Obtener nombres de usuario
  getVisuals(): Observable<any> {
    const endpoint = 'http://localhost:8080/netflix/visual';

    return this.http.get(endpoint).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // Obtener nombres de usuario
  getSubscriptions(): Observable<any> {
    const endpoint = 'http://localhost:8080/netflix/subscription';

    return this.http.get(endpoint).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // Método para eliminar cliente, petición DELETE
  deleteCustomer(idCustomer: number): Observable<any> {
    const endpoint = `http://localhost:8080/netflix/customer/${idCustomer}`;

    return this.http.delete<any>(endpoint, this.httpOptions);
  }

  // Método para eliminar producto, petición DELETE
  deleteProduct(idProduct: number): Observable<any> {
    const endpoint = `http://localhost:8080/netflix/products/${idProduct}`;

    return this.http.delete<any>(endpoint, this.httpOptions);
  }

  // Método para eliminar visualización, petición DELETE
  deleteVisual(idCustomer: number, idVisual: number): Observable<any> {
    const endpoint = `http://localhost:8080/netflix/visual/c${idCustomer}/v${idVisual}`;

    return this.http.delete<any>(endpoint, this.httpOptions);
  }

  // Método para eliminar subscripción, petición DELETE
  deleteSubscription(idCustomer: number): Observable<any> {
    const endpoint = `http://localhost:8080/netflix/subscription/c${idCustomer}`;

    return this.http.delete<any>(endpoint, this.httpOptions);
  }

  /*
    // Método para crear producto, realizando POST
  createProduct(product: ProductI): Observable<ProductI> {
    const endpoint = 'http://localhost:8080/netflix/products/';

    return this.http.post<ProductI>(endpoint, product, this.httpOptions);
    // .pipe(catchError(this.handleError('createProduct', product)));
  }
  */
}
