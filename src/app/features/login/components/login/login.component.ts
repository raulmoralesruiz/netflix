import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registeredUsers: any[];

  constructor(private loginService: LoginService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
  });

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

        console.log('---> response res login controller:');
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  login(): void {
    console.log('boton login ok');
    console.log(this.loginForm.value.username);

    let username = this.loginForm.value.username;
    let encontrado = false;

    for (let i = 0; i < this.registeredUsers.length && !encontrado; i++) {
      let usuario = this.registeredUsers[i];
      if (usuario == username) {
        encontrado = true;
        console.log(`Acceso correcto, usuario: ${usuario}`);
        sessionStorage.setItem('activeUser', usuario);
        this.router.navigate(['home']);
      }
    }
    if (!encontrado) {
      alert(`Acceso denegado`);
    }
  }

  createCustomer(): void {
    // Se guardan los datos del formulario
    let formData = this.registerForm.value;

    // Se crea producto, utilizando datos del formulario, usando servicio createProduct
    this.loginService.createCustomer(formData).subscribe((customer) => {
      alert('Cliente creado!');
      console.log(customer);
    });
  }
}
