import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DetailHeroComponent } from './detail-hero.component';
import { DataService } from 'src/app/core/services/data.service';
import { Superhero } from 'src/app/core/models/superhero.model';
import { signal, WritableSignal } from '@angular/core';

describe('DetailHeroComponent', () => {
  let component: DetailHeroComponent;
  let fixture: ComponentFixture<DetailHeroComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let heroesSignal: WritableSignal<Superhero[]>;

  beforeEach(async () => {
    const mockHeroes: Superhero[] = [
      { id: 1, name: 'Hero One', realName: 'Real One', origin: 'Origin One', powers: ['Power1'], weaknesses: ['Weakness1'], city: 'City1', team: 'Team1', firstAppearance: '2020', enemies: ['Enemy1'], image: 'image1.jpg' },
      { id: 2, name: 'Hero Two', realName: 'Real Two', origin: 'Origin Two', powers: ['Power2'], weaknesses: ['Weakness2'], city: 'City2', team: 'Team2', firstAppearance: '2021', enemies: ['Enemy2'], image: 'image2.jpg' }
    ];

    heroesSignal = signal<Superhero[]>([]);

    mockDataService = jasmine.createSpyObj('DataService', [], {
      heroesSignal: heroesSignal,
    });

    await TestBed.configureTestingModule({
      imports: [DetailHeroComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '1' : null),
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailHeroComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly compute selectedHeroId from route parameters', () => {
    fixture.detectChanges();
    expect(component.selectedHeroId()).toBe(1);
  });

  it('should correctly compute hero when heroesSignal changes', () => {
    heroesSignal.set([
      ...heroesSignal(),
      { id: 1, name: 'Hero One', realName: 'Real One', origin: 'Origin One', powers: ['Power1'], weaknesses: ['Weakness1'], city: 'City1', team: 'Team1', firstAppearance: '2020', enemies: ['Enemy1'], image: 'image1.jpg' },
    ]);

    fixture.detectChanges();
    expect(component.hero()?.name).toBe('Hero One');
  });

  it('should return undefined for hero if ID does not match', () => {
    heroesSignal.set([
      { id: 2, name: 'Hero Two', realName: 'Real Two', origin: 'Origin Two', powers: ['Power2'], weaknesses: ['Weakness2'], city: 'City2', team: 'Team2', firstAppearance: '2021', enemies: ['Enemy2'], image: 'image2.jpg' },
    ]);

    fixture.detectChanges();
    expect(component.hero()).toBeUndefined();
  });

  it('should log changes to hero via effect (optional test)', () => {
    const consoleSpy = spyOn(console, 'log');
    heroesSignal.set([
      { id: 1, name: 'Hero One', realName: 'Real One', origin: 'Origin One', powers: ['Power1'], weaknesses: ['Weakness1'], city: 'City1', team: 'Team1', firstAppearance: '2020', enemies: ['Enemy1'], image: 'image1.jpg' },
    ]);

    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith('Héroe actual:', jasmine.objectContaining({ name: 'Hero One' }));
  });
});
