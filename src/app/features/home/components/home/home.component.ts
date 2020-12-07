import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomerI } from 'src/app/interfaces/customer';
import { ProductI } from 'src/app/interfaces/product';
import { HomeService } from '../../services/home.service';
import { SelectI } from 'src/app/interfaces/select';
import { SubscriptionI } from 'src/app/interfaces/subscription';
import { VisualI } from 'src/app/interfaces/visual';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  activeUser: string;
  customer: CustomerI;
  activeSubscription: boolean;
  productsAvailable: ProductI[];
  subscriptionTypes: SelectI[];
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
    subscriptionType: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    // Se guarda el usuario activo en el sistema
    this.subscriptionTypes = this.homeService.getSubscriptionType();
    this.getActiveUser();
  }

  getActiveUser(): void {
    this.activeUser = sessionStorage.getItem('activeUser');
    this.activeSubscription = false;

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

          if (this.customer.subscription != null) {
            this.activeSubscription = true;

            if (this.customer.subscription.subscriptionType == 'BASIC') {
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

    let newSubscription: SubscriptionI = {
      start: '2020-01-01T01:00:00',
      end: '2021-01-01T01:00:00',
      subscriptionType: this.subscriptionForm.value.subscriptionType,
      idCustomer: this.customer.id,
    };
    console.log('newSubscription');
    console.log(newSubscription);

    this.homeService
      .createSubscription(this.customer.id, newSubscription)
      .subscribe(
        (sub) => {
          alert('subscripción creada!');
          console.log('sub');
          console.log(sub);
        },
        (error) => {
          console.log(error);
        }
      );

    window.location.reload();
  }

  addVisual(idProduct: number): void {
    console.log(this.customer);

    let visual: VisualI = {
      start: ' 2020-01-01T01:00:00',
      end: '2021-01-01T01:00:00',
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
    console.log(this.subscriptionForm.value.subscriptionType);

    console.log(Date.now());

    this.todayDate = this.dtPipe.transform(Date.now(), 'yyyy-MM-dd_hh:mm:ss');
    console.log(this.todayDate);
    console.log(this.setTodayDate());
  }

  setTodayDate(): string {
    return this.dtPipe.transform(Date.now(), 'yyyy-MM-dd_hh:mm:ss');
  }
}
