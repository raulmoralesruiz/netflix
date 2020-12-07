import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registeredUsers: any[];

  constructor(private loginService: LoginService, private router: Router) {}

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    dni: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.loginService.saveRegisteredUsers().subscribe(
      (res) => {
        this.registeredUsers = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createCustomer(): void {
    // Se guardan los datos del formulario
    let formData = this.registerForm.value;

    // Se crea producto, utilizando datos del formulario, usando servicio createProduct
    this.loginService.createCustomer(formData).subscribe(
      (customer) => {
        alert('Cliente creado!');
        console.log(customer);

        this.registerForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
