import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SelectI } from '../interfaces/select';
import { ProductI } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {
    console.log('servicio admin funcionando');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
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

  // Se definnene los tipos de suscripciones
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
  getSuscriptionType(): SelectI[] {
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
  getSuscriptions(): Observable<any> {
    const endpoint = 'http://localhost:8080/netflix/suscription';

    return this.http.get(endpoint).pipe(
      map((response) => {
        return response;
      })
    );
  }
}