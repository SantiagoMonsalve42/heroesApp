import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-confirmar-component',
  templateUrl: './confirmar-component.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {
  
  constructor(private dialogRef: MatDialogRef<ConfirmarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: heroe) { }

  ngOnInit(): void {

  }

  borrar(): void{
    this.dialogRef.close(true);
  }
  cerrar(): void{
    this.dialogRef.close();
  }
}
