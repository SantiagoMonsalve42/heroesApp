import { Pipe, PipeTransform } from '@angular/core';
import { heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen',
  pure: true
})
export class ImagenPipe implements PipeTransform {

  transform(heroe : heroe): string {

    if( !heroe.id && !heroe.alt_image){
      return 'assets/no-image.png'
    }else
    if( heroe.alt_image){
      return heroe.alt_image;
    }else{
      return "assets/heroes/"+heroe.id+".jpg";
    }

  }

}
