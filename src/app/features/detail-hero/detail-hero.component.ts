import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Superhero } from 'src/app/core/models/superhero.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-hero.component.html',
  styleUrl: './detail-hero.component.scss'
})
export class DetailHeroComponent {

  private dataService = inject(DataService);
  private route = inject(ActivatedRoute);


  public selectedHeroId: Signal<number | undefined> = computed(() => {
    const idParam = this.route.snapshot.paramMap.get('id');
    return idParam ? +idParam : undefined;
  });

  public hero: Signal<Superhero | undefined> = computed(() => {
    const heroes = this.dataService.heroesSignal();
    const heroId = this.selectedHeroId();
    return heroId ? heroes.find(hero => hero.id === heroId) : undefined;
  });

  constructor() {
    effect(() => {
      console.log('Héroe actual:', this.hero());
    });
  }
}
