import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Superhero } from '../models/superhero.model';
import { environment } from '../../../environments/environment';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  const mockHeroes: Superhero[] = [
    {
      id: 1,
      image: "https://firebasestorage.googleapis.com/v0/b/polapp-289c9.appspot.com/o/hros%2Fchapulin-colorado-multimexo.png?alt=media&token=7efd3f67-02a3-4047-8ba6-02eaa3164b0f",
      name: "Chapulín Colorado",
      realName: "El Chapulín",
      origin: "Héroe accidental con corazón noble",
      powers: ["Astucia", "Chipote Chillón", "Chiquitolina"],
      weaknesses: ["Miedo ocasional", "Falta de fuerza física"],
      city: "Ciudad de México",
      team: "Ninguno",
      firstAppearance: "1970-11-01",
      enemies: ["El Tripaseca", "El Cuajinais"]
    },
    {
      id: 2,
      name: "Iron Man",
      image: "https://firebasestorage.googleapis.com/v0/b/polapp-289c9.appspot.com/o/hros%2Fironman.jpg?alt=media&token=659e286b-becc-41b7-9d07-c94bf846fe5b",
      realName: "Tony Stark",
      origin: "Genio millonario tras un accidente mortal",
      powers: ["Traje de armadura avanzado", "Inteligencia tecnológica", "Riqueza"],
      weaknesses: ["Dependencia del reactor Arc", "Problemas de salud"],
      city: "Malibu",
      team: "Los Vengadores",
      firstAppearance: "1963-03-01",
      enemies: ["Mandarín", "Ultrón"]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(service, 'loadHeroes').and.callThrough();
  });



  it('should load heroes and update heroesSignal', () => {
    const req = httpMock.expectOne(`${environment.apiUrl}/superheroes.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);

    const heroes = service.heroesSignal();
    expect(heroes.length).toBe(mockHeroes.length);
    expect(heroes).toEqual(mockHeroes);
  });

  it('should get hero by id', () => {
    const heroId = 2;

    service.getHeroById(heroId).subscribe((hero) => {
      expect(hero).toEqual(mockHeroes[1]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/superheroes.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });


  it('should add a new hero and assign the next id', () => {
    service.heroesSignal.set(mockHeroes);

    const newHero: Superhero = {
      id: 0,
      name: 'Spider-Man',
      image: "https://firebasestorage.googleapis.com/v0/b/polapp-289c9.appspot.com/o/hros%2Fchapulin-colorado-multimexo.png?alt=media&token=7efd3f67-02a3-4047-8ba6-02eaa3164b0f",

      realName: 'Peter Parker',
      origin: 'Héroe con poderes arácnidos',
      powers: ['Sentido arácnido', 'Agilidad', 'Fuerza sobrehumana'],
      weaknesses: ['Miedo a la oscuridad', 'Falta de experiencia'],
      city: 'Nueva York',
      team: 'Los Vengadores',
      firstAppearance: '1962-08-01',
      enemies: ['Duende Verde', 'Doctor Octopus']
    };

    service.addHero(newHero);

    const heroes = service.heroesSignal();
    expect(heroes.length).toBe(mockHeroes.length + 1);
    expect(heroes[heroes.length - 1].name).toBe(newHero.name);
    const lastHeroId = heroes[heroes.length - 1].id;
    expect(lastHeroId).toBe(mockHeroes.length + 1);
  });



  it('should update a hero', fakeAsync(() => {
    const initialHeroes: Superhero[] = [
      {
        id: 1,
        image: "https://example.com/spiderman.png",
        name: "Spider-Man",
        realName: "Peter Parker",
        origin: "Spider bite accident",
        powers: ["Wall-crawling", "Spider sense"],
        weaknesses: ["Guilt", "Responsibility"],
        city: "New York",
        team: "Avengers",
        firstAppearance: "1962-08-01",
        enemies: ["Green Goblin"]
      }
    ];
    service.heroesSignal.set(initialHeroes);
    const updatedHero: Superhero = {
      id: 1,
      image: "https://firebasestorage.googleapis.com/v0/b/polapp-289c9.appspot.com/o/hros%2Fchapulin-colorado-multimexo.png?alt=media&token=7efd3f67-02a3-4047-8ba6-02eaa3164b0f",
      name: "Chapulín Colorado",
      realName: "El Chapulín",
      origin: "Héroe accidental con corazón noble",
      powers: ["Astucia", "Chipote Chillón", "Chiquitolina"],
      weaknesses: ["Miedo ocasional", "Falta de fuerza física"],
      city: "Ciudad de México",
      team: "Hombre araña",
      firstAppearance: "1970-11-01",
      enemies: ["El Tripaseca", "El Cuajinais"]
    };

    service.updateHero(updatedHero);

    tick();

    const updatedHeroInList = service.heroesSignal().find(hero => hero.id === updatedHero.id);
    expect(updatedHeroInList).toBeTruthy();
    expect(updatedHeroInList?.name).toBe(updatedHero.name);
  }));

  it('should not update a hero if id does not exist', fakeAsync(() => {
    service.heroesSignal.set(mockHeroes);

    const nonExistentHero: Superhero = {
      id: 999,
      name: 'Non-existent Hero',
      image: 'https://example.com/non-existent-hero.png',
      realName: 'N/A',
      origin: 'Unknown origin',
      powers: ['Unknown'],
      weaknesses: ['Unknown'],
      city: 'Unknown',
      team: 'None',
      firstAppearance: '2024-01-01',
      enemies: ['Unknown']
    };

    service.updateHero(nonExistentHero);

    tick();

    const heroes = service.heroesSignal();

    expect(heroes.length).toBe(mockHeroes.length);
    expect(heroes).not.toContain(jasmine.objectContaining({ name: 'Non-existent Hero' }));
  }));


  it('should handle an empty server response when loading heroes', () => {
    const emptyResponse: Superhero[] = [];

    const req = httpMock.expectOne(`${environment.apiUrl}/superheroes.json`);
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);

    const heroes = service.heroesSignal();

    expect(heroes.length).toBe(0);
    expect(heroes).toEqual(emptyResponse);
  });


  it('should return undefined if hero is not found by id', () => {
    const nonExistentHeroId = 999;

    service.getHeroById(nonExistentHeroId).subscribe((hero) => {
      expect(hero).toBeUndefined();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/superheroes.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should not update a hero with invalid data', fakeAsync(() => {
    service.heroesSignal.set(mockHeroes);

    const invalidHero: Superhero = {
      id: -1,
      name: '',
      image: '',
      realName: '',
      origin: '',
      powers: [],
      weaknesses: [],
      city: '',
      team: '',
      firstAppearance: '',
      enemies: []
    };

    service.updateHero(invalidHero);

    tick();

    const heroes = service.heroesSignal();
    expect(heroes.length).toBe(mockHeroes.length);
    expect(heroes).not.toContain(jasmine.objectContaining({ id: -1 }));
  }));

  it('should not delete a hero with an invalid id', () => {
    service.heroesSignal.set(mockHeroes);

    const invalidHeroId = -1;

    service.deleteHero(invalidHeroId);

    const heroes = service.heroesSignal();
    expect(heroes.length).toBe(mockHeroes.length);
    expect(heroes).toEqual(mockHeroes);
  });

  it('should not delete any hero when id does not exist', () => {
    service.heroesSignal.set(mockHeroes);

    const nonExistentHeroId = 999;

    service.deleteHero(nonExistentHeroId);

    const heroes = service.heroesSignal();
    expect(heroes.length).toBe(mockHeroes.length);
    expect(heroes).toEqual(mockHeroes);
  });

  it('should assign id 1 if heroes list is empty when adding a new hero', () => {
    service.heroesSignal.set([]);

    const newHero: Superhero = {
      id: 0,
      name: 'New Hero',
      image: 'https://example.com/new-hero.png',
      realName: 'New Real Name',
      origin: 'New Origin',
      powers: ['Power 1', 'Power 2'],
      weaknesses: ['Weakness 1'],
      city: 'New City',
      team: 'New Team',
      firstAppearance: '2024-01-01',
      enemies: ['New Enemy']
    };

    service.addHero(newHero);

    const heroes = service.heroesSignal();
    expect(heroes.length).toBe(1);
    expect(heroes[0].id).toBe(1);
  });

  it('should return undefined when hero is not found by id', () => {
    const heroId = 999;

    service.getHeroById(heroId).subscribe((hero) => {
      expect(hero).toBeUndefined();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/superheroes.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });




  it('should delete a hero by id', () => {
    service.heroesSignal.set(mockHeroes);

    const heroIdToDelete = 1;

    service.deleteHero(heroIdToDelete);

    const heroes = service.heroesSignal();

    const deletedHero = heroes.find(hero => hero.id === heroIdToDelete);
    expect(deletedHero).toBeUndefined();
    expect(heroes.length).toBe(mockHeroes.length - 1);
  });

  it('should not delete a hero if id does not exist', () => {
    service.heroesSignal.set(mockHeroes);

    const nonExistentHeroId = 999;

    service.deleteHero(nonExistentHeroId);

    const heroes = service.heroesSignal();

    expect(heroes.length).toBe(mockHeroes.length);
    expect(heroes).toEqual(mockHeroes);
  });
});
