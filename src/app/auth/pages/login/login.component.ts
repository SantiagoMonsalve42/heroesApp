import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
export class LoginComponent {

  auth:auth={
    id: '',
    email: '',
    usuario: ''
  };

  constructor(private Router: Router,
              private AuthService: AuthService) { }

  login(): void{
    if(this.auth.id){
      this.AuthService.login(this.auth.id)
      .subscribe(data => {
        this.Router.navigate(['/heroes']);
      });
    }
    
  }
}
