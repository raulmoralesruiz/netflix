import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomerI } from 'src/app/interfaces/customer';
import { ProductI } from 'src/app/interfaces/product';
import { SelectI } from 'src/app/interfaces/select';
import { SubscriptionI } from 'src/app/interfaces/subscription';
import { VisualI } from 'src/app/interfaces/visual';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  /* variable que guarda el usuario activo */
  activeUser = sessionStorage.getItem('activeUser');
  /* variable que guarda la tabla activa */
  activeTable: string;
  /* variable que guarda la tarjeta activa */
  activeCard: string;

  /* variable que guarda las categorias (desplegable) */
  categories: SelectI[];
  /* variable que guarda los tipos de contenido (desplegable) */
  contentTypes: SelectI[];
  /* variable que guarda los tipos de subscripción (desplegable) */
  subscriptionTypes: SelectI[];

  /* variable que guarda un cliente (utilizado en búsqueda de cliente) */
  oneCustomer: CustomerI;
  /* variable utilizada en input de búsqueda de cliente */
  searchedIdCustomer = '';

  /* variable que guarda un array de clientes */
  customers: CustomerI[];
  /* variable que guarda un array de productos */
  products: ProductI[];
  /* variable que guarda un array de visualizaciones */
  visuals: VisualI[];
  /* variable que guarda un array de subscripciones */
  subscriptions: SubscriptionI[];

  constructor(private adminService: AdminService) {}

  productForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    contentType: new FormControl('', Validators.required),
    subscriptionType: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    /* Se recupera el contenido de los desplegables y se introduce en los arrays/variables correspondientes */
    this.categories = this.adminService.getCategories();
    this.contentTypes = this.adminService.getContentType();
    this.subscriptionTypes = this.adminService.getSubscriptionType();
  }

  /* Método utilizado para crear un producto */
  sendData(): void {
    // Se guardan los datos del formulario
    let formData = this.productForm.value;

    // Se crea producto, utilizando datos del formulario, usando servicio createProduct
    this.adminService.createProduct(formData).subscribe((producto) => {
      alert('Producto creado!');
      console.log(producto);

      // se limpia el formulario
      this.productForm.reset();

      // Se cierra cualquier vista (GET), para que el usuario vuelva a pulsar el botón GET
      this.closeTable();
      this.closeCard();
    });
  }

  /* Método utilizado para obtener clientes */
  getCustomers(): void {
    this.adminService.getCustomers().subscribe(
      (res) => {
        this.customers = res;
        this.activeCard = 'customers';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /* Método utilizado para obtener un solo cliente, buscando por id */
  getOneCustomer(): void {
    this.adminService
      .getOneCustomer(parseInt(this.searchedIdCustomer))
      .subscribe(
        (res) => {
          this.oneCustomer = res;
          this.activeTable = 'oneCustomer';
        },
        (error) => {
          console.log(error);
        }
      );

    this.closeTable();
  }

  /* Método utilizado para obtener productos */
  getProducts(): void {
    this.adminService.getProducts().subscribe(
      (res) => {
        this.products = res;
        this.activeCard = 'products';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /* Método utilizado para obtener visualizaciones */
  getVisuals(): void {
    this.adminService.getVisuals().subscribe(
      (res) => {
        this.visuals = res;
        this.activeCard = 'visuals';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /* Método utilizado para obtener subscripciones */
  getSubscriptions(): void {
    this.adminService.getSubscriptions().subscribe(
      (res) => {
        this.subscriptions = res;
        this.activeCard = 'subscriptions';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /* Método utilizado para cerrar la vista de tarjetas */
  closeCard(): void {
    this.activeCard = '';
  }

  /* Método utilizado para cerrar la vista de tablas */
  closeTable(): void {
    this.activeTable = '';
  }

  /* Método que comprueba si el usuario es admin */
  activeUserIsAdmin(): boolean {
    if (this.activeUser == 'admin') {
      return true;
    } else {
      return false;
    }
  }

  /* Método utilizado para eliminar cliente */
  deleteCustomer(idCustomer: number): void {
    this.adminService.deleteCustomer(idCustomer).subscribe(
      (res) => {
        console.log(res);
        alert('Cliente eliminado correctamente.');
      },
      (error) => {
        console.log(error);
      }
    );

    this.closeTable();
  }

  /* Método utilizado para eliminar producto */
  deleteProduct(idProduct: number): void {
    this.adminService.deleteProduct(idProduct).subscribe(
      (res) => {
        console.log(res);
        alert('Producto eliminado correctamente.');
      },
      (error) => {
        console.log(error);
      }
    );

    this.closeTable();
  }

  /* Método utilizado para eliminar visualizacion */
  deleteVisual(idCustomer: number, idVisual: number): void {
    this.adminService.deleteVisual(idCustomer, idVisual).subscribe(
      (res) => {
        console.log(res);
        alert('Visualización eliminada correctamente.');
      },
      (error) => {
        console.log(error);
      }
    );

    this.closeTable();
  }

  /* Método utilizado para eliminar subscripcion */
  deleteSubscription(idCustomer: number): void {
    this.adminService.deleteSubscription(idCustomer).subscribe(
      (res) => {
        console.log(res);
        alert('Subscripción eliminada correctamente.');
      },
      (error) => {
        console.log(error);
      }
    );

    this.closeTable();
  }
}
