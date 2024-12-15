import { Component, inject, output } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ModalHeroService } from '../modal-hero/modal-hero.service';
import { ModalHeroComponent } from '../modal-hero/modal-hero.component';
import { Superhero } from 'src/app/core/models/superhero.model';
import { Router } from '@angular/router';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule
]

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ MATERIAL_MODULES],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  route = inject(Router)
  onNewContactEvent = output<void>();
  private readonly _modalService = inject(ModalHeroService)
  goHome(){
    this.route.navigate(['/list-heros'])
  }


  openModal(){
    this._modalService.openModal<ModalHeroComponent, Superhero>(ModalHeroComponent)
  }

}
