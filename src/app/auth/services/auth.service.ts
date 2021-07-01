import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,of } from 'rxjs';
import { ignoreElements, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { auth } from '../interfaces/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string =environment.baseUrl;
  private _auth:auth | undefined;
  constructor(private HttpClient: HttpClient) { }


  get auth(): auth{
    return {...this._auth!};
  }

  login(id: string):Observable<auth>{
    return this.HttpClient.get<auth>(this.baseUrl+"/usuarios/"+id)
                          .pipe(
                            tap(auth => this._auth = auth),
                            tap(auth => localStorage.setItem('id',auth.id))
                          );
  }

  crearUsuario(user: auth): Observable<auth>{
    return this.HttpClient.post<auth>(this.baseUrl+"/usuarios",user);
  }

  verificarAutenticacion(): Observable<boolean>{
    if(!localStorage.getItem("id")){
      return of(false);
    }
    return this.HttpClient.get<auth>(this.baseUrl+"/usuarios/"+localStorage.getItem("id"))
                          .pipe(
                            map(auth => {
                              this._auth=auth;
                              return true;
                            })
                          );
  }

  logout(): void{
    this._auth=undefined;
  }


}
