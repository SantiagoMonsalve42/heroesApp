import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styles: [
  ]
})
export class ListarComponent implements OnInit{

  listadoHeroes : heroe[] = [];

  constructor(private heroeService: HeroesService) { }



  ngOnInit(): void {
    this.heroeService.leerHeroes()
        .subscribe(data => this.listadoHeroes=data);
  }




}
