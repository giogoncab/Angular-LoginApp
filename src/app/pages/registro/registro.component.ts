import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {return; }

    swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
    .subscribe(resp => {
      console.log(resp);
      swal.close();

      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');
    },
    (err) => {
      console.log(err.error.error.message);
      swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
    });
  }

}
