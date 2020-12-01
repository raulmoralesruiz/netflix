import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerI } from '../../interfaces/customer';
import { ProductI } from '../../interfaces/product';

import { SelectI } from '../../interfaces/select';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  categories: SelectI[];
  contentTypes: SelectI[];
  suscriptionTypes: SelectI[];

  customers: CustomerI[];
  products: ProductI[];
  visuals: ProductI[];
  suscriptions: ProductI[];

  constructor(private adminService: AdminService) {}

  productForm = new FormGroup({
    title: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    tipoContenido: new FormControl('', Validators.required),
    tipoSuscripcion: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    /* Se recupera el contenido de los desplegables y se introduce en los arrays/variables correspondientes */
    this.categories = this.adminService.getCategories();
    this.contentTypes = this.adminService.getContentType();
    this.suscriptionTypes = this.adminService.getSuscriptionType();
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
    });
  }

  getCustomers(): void {
    this.adminService.getCustomers().subscribe(
      (res) => {
        this.customers = res;

        console.log(res);
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
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
