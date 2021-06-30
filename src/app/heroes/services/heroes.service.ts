import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { heroe } from '../interfaces/heroes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {


  private baseUrl : string =environment.baseUrl;

  constructor(private http : HttpClient) { }

  leerHeroes(): Observable<heroe[]>{
    const url=this.baseUrl+"/heroes";
    return this.http.get<heroe[]>(url);
  }

  leerHeroeById(id: string): Observable<heroe>{
    const url=this.baseUrl+"/heroes/"+id;
    return this.http.get<heroe>(url);
  }

  leerHeroeBySugerencia(termino: string): Observable<heroe[]>{
    const url=this.baseUrl+"/heroes?q="+termino+"&_limit=5";
    return this.http.get<heroe[]>(url);
  }

}

