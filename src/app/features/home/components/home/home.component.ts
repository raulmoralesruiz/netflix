import { Component, OnInit } from '@angular/core';
import { CustomerI } from '../../interfaces/customer';
import { ProductI } from '../../interfaces/product';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  activeUser: string;
  customer: CustomerI;
  activeSuscription: boolean;
  productsAvailable: ProductI[];
  // activeSuscriptionType: string;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    // Se guarda el usuario activo en el sistema
    this.getActiveUser();
  }

  getActiveUser(): void {
    this.activeUser = sessionStorage.getItem('activeUser');
    this.activeSuscription = false;

    let encontrado = false;
    // let userObject;

    this.homeService.getIdActiveUserData().subscribe(
      (res) => {
        console.log(res);

        // Se recorren todos los resultados
        for (let i = 0; i < res.length && !encontrado; i++) {
          // Se obtiene cada usuario
          let user = res[i];

          // se guarda el nombre de usuario
          let username = user.username;

          // Comprobar si el usuario del bucle coincide con el usuario activo.
          if (username == this.activeUser) {
            // guardamos el objeto de usuario y cambiamos la bandera a true.
            encontrado = true;
            this.customer = user;
          }
        }

        if (this.customer.suscription != null) {
          this.activeSuscription = true;
          // this.activeSuscriptionType = this.customer.suscription.typeOfSuscription;

          if (this.customer.suscription.typeOfSuscription == 'BASIC') {
            this.getAvailableBasicProducts();
          } else {
            this.getAvailablePremiumProducts();
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAvailableBasicProducts(): void {
    this.homeService.getBasicProducts().subscribe(
      (res) => {
        console.log(res);
        this.productsAvailable = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAvailablePremiumProducts(): void {
    this.homeService.getPremiumProducts().subscribe(
      (res) => {
        console.log(res);
        this.productsAvailable = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
