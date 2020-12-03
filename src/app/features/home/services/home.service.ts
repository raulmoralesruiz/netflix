import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {
    console.log('servicio login funcionando');
  }

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  // };

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
}
