import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Superhero } from '../models/superhero.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = environment.apiUrl;

  heroesSignal: WritableSignal<Superhero[]> = signal([]);

  sortedHeroes = computed(() =>
     this.heroesSignal().slice().sort((a, b) => a.name.localeCompare(b.name))
  );

  constructor(private http: HttpClient) {
    this.loadHeroes();
  }

  public loadHeroes(): void {
    this.http
      .get<Superhero[]>(`${this.dataUrl}/superheroes.json`)
      .subscribe((heroes) => {
        this.heroesSignal.set(heroes);
      });
  }



  getHeroById(id: number): Observable<Superhero | undefined> {
    return new Observable<Superhero | undefined>((observer) => {
        const hero = this.heroesSignal().find((hero) => hero.id === id);
        if (hero) {
          observer.next(hero);
          observer.complete();
        }
    });
  }



  addHero(newHero: Superhero): void {
    const currentHeroes = this.heroesSignal();
    const nextId = Math.max(...currentHeroes.map((h) => h.id), 0) + 1;
    this.heroesSignal.set([...currentHeroes, { ...newHero, id: nextId }]);
  }

  updateHero(updatedHero: Superhero): void {
    const currentHeroes = this.heroesSignal();
    const updatedHeroes = currentHeroes.map((hero) =>
      hero.id === updatedHero.id ? updatedHero : hero
    );
    this.heroesSignal.set(updatedHeroes);
  }

  deleteHero(id: number): void {
    const currentHeroes = this.heroesSignal();
    const filteredHeroes = currentHeroes.filter((hero) => hero.id !== id);
    this.heroesSignal.set(filteredHeroes);
  }
}
