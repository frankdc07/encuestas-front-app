import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  constructor(private authService: AuthService,
  private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.estaAutenticado()) {
      this.router.navigate(['/encuestas']);
    }
  }

  login(): void {
    if(this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error!', 'Usuario o password vacío', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe( response =>{
      this.authService.guardarToken(response.access_token);
      this.router.navigate(['/encuestas']);
    }, err => {
      if(err.status == 400) {
        swal.fire('Error!', 'Credenciales inválidas', 'error');
      }
    });
  }

}
