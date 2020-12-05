import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomerI } from '../../interfaces/customer';
import { ProductI } from '../../interfaces/product';
import { HomeService } from '../../services/home.service';
import { SelectI } from 'src/app/interfaces/select';
import { SuscriptionI } from 'src/app/interfaces/suscription';
import { VisualI } from 'src/app/interfaces/visual';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  activeUser: string;
  customer: CustomerI;
  activeSuscription: boolean;
  productsAvailable: ProductI[];
  suscriptionTypes: SelectI[];
  customerVisuals: VisualI[];
  visualsActivated: boolean;
  todayDate: string;

  constructor(
    private homeService: HomeService,
    private elementRef: ElementRef,
    private dtPipe: DatePipe
  ) {}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#2f4f4f';
  }

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

    let suscription: SuscriptionI = {
      start: '2020-01-01T01:00:00',
      end: '2021-01-01T01:00:00',
      typeOfSuscription: this.subscriptionForm.value.tipoSuscripcion,
      idCustomer: this.customer.id,
    };

    this.homeService
      .createSubscription(this.customer.id, suscription)
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

  addVisual(idProduct: number): void {
    console.log(this.customer);

    let visual: VisualI = {
      inicio: ' 2020-01-01T01:00:00',
      fin: '2021-01-01T01:00:00',
    };

    this.homeService
      .createVisual(this.customer.id, idProduct, visual)
      .subscribe(
        (visual) => {
          alert('visualización creada!');
          console.log(visual);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  showVisuals(): void {
    this.homeService.getVisuals(this.customer.id).subscribe(
      (res) => {
        console.log(res);
        this.customerVisuals = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setVisualsOn(): void {
    this.visualsActivated = true;
  }

  setVisualsOff(): void {
    this.visualsActivated = false;
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
