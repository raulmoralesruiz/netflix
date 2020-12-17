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
  getUsersError: string;

  constructor(private loginService: LoginService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  /* registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    dni: new FormControl('', Validators.required),
  }); */

  ngOnInit(): void {
    this.saveRegisteredUsers();
  }

  saveRegisteredUsers(): void {
    this.loginService.saveRegisteredUsers().subscribe(
      (res) => {
        this.registeredUsers = res;
      },
      (error) => {
        console.log(error);
        this.getUsersError = error.name;
        console.log(this.getUsersError);
      }
    );
  }

  login(): void {
    /* console.log('boton login ok');
    console.log(this.loginForm.value.username); */

    if (this.getUsersError == 'HttpErrorResponse') {
      alert('ERROR. El servidor no responde');
    } else {
      let username = this.loginForm.value.username;
      let encontrado = false;

      for (let i = 0; i < this.registeredUsers.length && !encontrado; i++) {
        let usuario = this.registeredUsers[i];
        if (usuario == username) {
          encontrado = true;
          /* console.log(`Acceso correcto, usuario: ${usuario}`); */

          // Se guarda el usuario activo en session storage.
          sessionStorage.setItem('activeUser', usuario);

          // Se envía la ruta hacía el componente home.
          this.router.navigate(['home']);

          // Se refresca la página (para mostrar u ocultar botón admin en el menú)
          // window.location.reload();
        }
      }
      if (!encontrado) {
        alert(`Acceso denegado`);
      }
    }
  }

  /* createCustomer(): void {
    // Se guardan los datos del formulario
    let formData = this.registerForm.value;

    // Se crea producto, utilizando datos del formulario, usando servicio createProduct
    this.loginService.createCustomer(formData).subscribe((customer) => {
      alert('Cliente creado!');
      console.log(customer);
    });
  } */
}
