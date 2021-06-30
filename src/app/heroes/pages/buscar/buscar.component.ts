import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


import { heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent {

  termino: string="";
  ListadoHeroes: heroe []=[];
  heroe!: heroe | undefined;

  constructor(private HeroesService: HeroesService) { }


  busqueda(){
    this.HeroesService.leerHeroeBySugerencia(this.termino)
        .subscribe( data => this.ListadoHeroes = data);
  }

  opcionSeleccionada($event: MatAutocompleteSelectedEvent ){
    const heroe: heroe = $event.option.value;
    if(heroe != null && heroe != undefined){
      this.termino=heroe.superhero;
      this.HeroesService.leerHeroeById( heroe.id! )
          .subscribe(heroe => this.heroe = heroe);
    }else{
      this.heroe=undefined;
    }

  }
}
