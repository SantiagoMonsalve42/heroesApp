import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
          
import { switchMap } from 'rxjs/operators';

import { heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar-component/confirmar-component.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 5px;
  }
  `]
})
export class AgregarComponent implements OnInit {


  publisher=[
    {
      id:"DC Comics",
      desc:"DC Comics"
    },
    {
      id:"Marvel Comics",
      desc:"Marvel Comics"
    }
  ]
  heroe: heroe={
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_image:''
  }
  constructor(private HeroesService: HeroesService,
              private ActivatedRoute: ActivatedRoute,
              private Router:Router,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    if(this.Router.url.includes('editar')){
      this.ActivatedRoute.params
      .pipe(
        switchMap(({id}) => this.HeroesService.leerHeroeById(id))
      ).subscribe(
        heroe => this.heroe=heroe
      );
    }
  }

  guardar():void{
    if(this.validarDatos()){
      if(this.heroe.id === undefined){  
          this.HeroesService.agregar(this.heroe)
          .subscribe(resp => {
            this.mostrarSnakbar("Registro Agregado");
            this.Router.navigate(['/heroes/editar',resp.id]);
            
          });
      }else{
          this.HeroesService.editar(this.heroe)
          .subscribe(resp => {
            this.mostrarSnakbar("Registro Editado");
            this.Router.navigate(['/heroes/editar',resp.id]);
          });
      }
        
    }
  }
  validarDatos(): boolean{
    if(this.heroe.superhero.trim().length === 0){
      alert("Debe ingresar el nombre del superhéroe");
      return false;
    }
    if(this.heroe.alter_ego.trim().length === 0){
      alert("Debe ingresar el alter ego del superhéroe");
      return false;
    }
    if(this.heroe.first_appearance.trim().length === 0){
      alert("Debe ingresar la primera aparición del superhéroe");
      return false;
    }
    if(this.heroe.characters.trim().length === 0){
      alert("Debe ingresar los personajes del superhéroe");
      return false;
    }
    if(this.heroe.alt_image.trim().length === 0){
      alert("Debe ingresar la ruta de la imagen del superhéroe");
      return false;
    }
    return true;
  }

  eliminar():void{
      const dialog= this.dialog.open(ConfirmarComponent,{
        width: '250px',
        data: {...this.heroe}
      });

      dialog.afterClosed().subscribe(
        (result) => {
          if(result){
            this.HeroesService.eliminar(this.heroe.id!)
                .subscribe((data) =>{
            this.Router.navigate(['/heroes/listado']);
            });
         }
        }
      );
  }

  mostrarSnakbar(mensaje: string) : void {
    this._snackBar.open(mensaje,"OK",{
      duration: 2500
    });
  }
}
