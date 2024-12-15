import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalHeroComponent } from '@shared/components/modal-hero/modal-hero.component';
import { ModalHeroService } from '@shared/components/modal-hero/modal-hero.service';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { Superhero } from './core/models/superhero.model';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'angularSignals';

}
