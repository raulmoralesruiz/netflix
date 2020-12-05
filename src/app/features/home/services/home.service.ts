import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectI } from 'src/app/interfaces/select';

import { SuscriptionI } from 'src/app/interfaces/suscription';
import { VisualI } from 'src/app/interfaces/visual';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {
    console.log('servicio login funcionando');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

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

  getSuscriptionType(): SelectI[] {
    return this.suscriptionType;
  }

  getIdActiveUserData(): Observable<any> {
    const endpoint = 'http://localhost:8080/netflix/customer';

    return this.http.get(endpoint).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getBasicProducts(): Observable<any> {
    const endpoint = 'http://localhost:8080/netflix/products/basic/';

    return this.http.get(endpoint).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getPremiumProducts(): Observable<any> {
    const endpoint = 'http://localhost:8080/netflix/products/premium/';

    return this.http.get(endpoint).pipe(
      map((response) => {
        return response;
      })
    );
  }

  createSubscription(
    idCustomer: number,
    subscription: SuscriptionI
  ): Observable<any> {
    const endpoint = `http://localhost:8080/netflix/suscription/c${idCustomer}`;

    return this.http.post<SuscriptionI>(
      endpoint,
      subscription,
      this.httpOptions
    );
  }

  createVisual(
    idCustomer: number,
    idProduct: number,
    visual: VisualI
  ): Observable<any> {
    const endpoint = `http://localhost:8080/netflix/visual/c${idCustomer}/p${idProduct}`;

    return this.http.post<SuscriptionI>(endpoint, visual, this.httpOptions);
  }

  getVisuals(idCustomer: number): Observable<any> {
    const endpoint = `http://localhost:8080/netflix/visual/c${idCustomer}`;

    return this.http.get(endpoint).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
