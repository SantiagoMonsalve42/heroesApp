import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { auth } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [`
  mat-card {
  max-width: 400px;
  margin: 2em auto;
  text-align: center;
  }

  mat-form-field {
  display: block;
  }
  `
  ]
})
export class RegistroComponent  {

  auth:auth={
    id: '',
    email: '',
    usuario: ''
  };

  constructor(private Router: Router,
              private AuthService: AuthService,
              private _snackBar: MatSnackBar) { }


  crear(): void{

    this.AuthService.crearUsuario(this.auth)
        .subscribe( data =>{
          this.mostrarSnakbar("Inicie sesión con el id "+data.id)
        } );
      
  }

  mostrarSnakbar(mensaje: string) : void {
    this._snackBar.open(mensaje,"OK",{
      duration: 10000
    });
  }
}
