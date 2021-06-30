import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 5px;
  }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe !: heroe;

  constructor(private route: ActivatedRoute,
              private heroeService: HeroesService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
        .pipe(
          switchMap( (data) => this.heroeService.leerHeroeById(data.id))
        )
        .subscribe((heroe) => this.heroe = heroe);
  }

  volver(){
    this.router.navigate(['/heroes/listado']);
  }

}

