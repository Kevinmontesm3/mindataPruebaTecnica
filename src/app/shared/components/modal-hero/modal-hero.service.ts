import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { Superhero } from 'src/app/core/models/superhero.model';

@Injectable({
  providedIn: 'root'
})
export class ModalHeroService {

  private readonly _dialog = inject(MatDialog)

  openModal<CT, T = Superhero>(componentRef: ComponentType<CT>, data? : T , isEditing = false){
    const config = {data, isEditing};

    this._dialog.open( componentRef,{
      data: config,
      width: '70vw'
    } )
  }

  closeModal(){
    this._dialog.closeAll()
  }
}
