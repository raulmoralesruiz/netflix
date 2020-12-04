import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectI } from 'src/app/interfaces/select';
import { SuscriptionI } from 'src/app/interfaces/suscription';

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
  newSuscription: SuscriptionI;
  suscriptionTypes: SelectI[];
  // activeSuscriptionType: string;
  todayDate: string;

  constructor(private homeService: HomeService, private dtPipe: DatePipe) {}

  subscriptionForm = new FormGroup({
    tipoSuscripcion: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    // Se guarda el usuario activo en el sistema
    this.suscriptionTypes = this.homeService.getSuscriptionType();
    this.getActiveUser();
  }

  getActiveUser(): void {
    this.activeUser = sessionStorage.getItem('activeUser');
    this.activeSuscription = false;

    let encontrado = false;
    // let userObject;

    // Se comprueba si hay algún usuario logeado.
    if (this.activeUser != null) {
      // Se guardan los datos del usuario.
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

  activateSubscription(): void {
    console.log(this.customer);

    this.newSuscription = {
      start: '2020-01-01T01:00:00',
      end: '2021-01-01T01:00:00',
      typeOfSuscription: this.subscriptionForm.value.tipoSuscripcion,
      idCustomer: this.customer.id,
    };

    this.homeService
      .createSubscription(this.customer.id, this.newSuscription)
      .subscribe(
        (sub) => {
          alert('subscripción creada!');
          console.log(sub);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // EXTRA...

  showInfo(): void {
    console.log(this.subscriptionForm.value.tipoSuscripcion);

    console.log(Date.now());

    this.todayDate = this.dtPipe.transform(Date.now(), 'yyyy-MM-dd_hh:mm:ss');
    console.log(this.todayDate);
    console.log(this.setTodayDate());
  }

  setTodayDate(): string {
    return this.dtPipe.transform(Date.now(), 'yyyy-MM-dd_hh:mm:ss');
  }
}
