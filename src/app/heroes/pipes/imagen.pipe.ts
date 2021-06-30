import { Pipe, PipeTransform } from '@angular/core';
import { heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe : heroe): string {
    return "assets/heroes/"+heroe.id+".jpg";
  }

}
