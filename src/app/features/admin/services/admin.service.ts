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
      /* 'Access-Control-Allow-Origin': '*', */
    }),
  };

  /* httpDeleteOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    }),
  }; */

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
      value: 'COMEDIA',
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
  private suscriptionType: SelectI[] = [
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
    return this.suscriptionType;
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
    const endpoint = 'http://localhost:8080/netflix/suscription';

    return this.http.get(endpoint).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // Método para eliminar producto, petición DELETE
  deleteProduct(idProduct: number): Observable<any> {
    const endpoint = `http://localhost:8080/netflix/products/${idProduct}`;

    return this.http.delete<any>(endpoint, this.httpOptions);
    // .pipe(catchError(this.handleError('createProduct', product)));
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
