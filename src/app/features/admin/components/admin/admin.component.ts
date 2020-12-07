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
  activeUser = sessionStorage.getItem('activeUser');
  activeTable: string;

  categories: SelectI[];
  contentTypes: SelectI[];
  subscriptionTypes: SelectI[];

  customers: CustomerI[];
  products: ProductI[];
  visuals: VisualI[];
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

  /* onSelect(id: number): void {
    console.log('value_selected:', id);
  } */

  sendData(): void {
    // Se guardan los datos del formulario
    let formData = this.productForm.value;

    // Se crea producto, utilizando datos del formulario, usando servicio createProduct
    this.adminService.createProduct(formData).subscribe((producto) => {
      alert('Producto creado!');
      console.log(producto);
      this.productForm.reset();
    });
  }

  getCustomers(): void {
    this.adminService.getCustomers().subscribe(
      (res) => {
        this.customers = res;
        this.activeTable = 'customers';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProducts(): void {
    this.adminService.getProducts().subscribe(
      (res) => {
        this.products = res;
        this.activeTable = 'products';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getVisuals(): void {
    this.adminService.getVisuals().subscribe(
      (res) => {
        this.visuals = res;
        this.activeTable = 'visuals';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSubscriptions(): void {
    this.adminService.getSubscriptions().subscribe(
      (res) => {
        this.subscriptions = res;
        this.activeTable = 'subscriptions';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeTable(): void {
    this.activeTable = '';
  }

  activeUserIsAdmin(): boolean {
    if (this.activeUser == 'admin') {
      return true;
    } else {
      return false;
    }
  }

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
}
