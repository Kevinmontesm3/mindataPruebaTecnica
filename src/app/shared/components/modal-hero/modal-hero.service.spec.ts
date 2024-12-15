import { TestBed } from '@angular/core/testing';
import { ModalHeroService } from './modal-hero.service';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Superhero } from 'src/app/core/models/superhero.model';

describe('ModalHeroService', () => {
  let service: ModalHeroService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalHeroService,
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } }
      ]
    });

    service = TestBed.inject(ModalHeroService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should open modal with correct data', () => {
    const mockHero: Superhero = {
      id: 1,
      name: 'Iron Man',
      realName: 'Tony Stark',
      origin: 'Earth',
      powers: ['Powered Armor', 'Super intelligence'],
      weaknesses: ['Narcissism'],
      city: 'New York',
      team: 'Avengers',
      firstAppearance: 'Tales of Suspense #39',
      enemies: ['Mandarin', 'Obadiah Stane'],
      image: 'ironman.jpg'
    };

    const componentRef = {} as ComponentType<any>;
    service.openModal(componentRef, mockHero);

    expect(dialog.open).toHaveBeenCalledWith(componentRef, {
      data: { data: mockHero, isEditing: false },
      width: '70vw'
    });
  });

  it('should pass isEditing flag as true when editing', () => {
    const mockHero: Superhero = {
      id: 1,
      name: 'Iron Man',
      realName: 'Tony Stark',
      origin: 'Earth',
      powers: ['Powered Armor', 'Super intelligence'],
      weaknesses: ['Narcissism'],
      city: 'New York',
      team: 'Avengers',
      firstAppearance: 'Tales of Suspense #39',
      enemies: ['Mandarin', 'Obadiah Stane'],
      image: 'ironman.jpg'
    };

    const componentRef = {} as ComponentType<any>;
    service.openModal(componentRef, mockHero, true);

    expect(dialog.open).toHaveBeenCalledWith(componentRef, {
      data: { data: mockHero, isEditing: true },
      width: '70vw'
    });
  });

  it('should default isEditing to false if not provided', () => {
    const mockHero: Superhero = {
      id: 1,
      name: 'Iron Man',
      realName: 'Tony Stark',
      origin: 'Earth',
      powers: ['Powered Armor', 'Super intelligence'],
      weaknesses: ['Narcissism'],
      city: 'New York',
      team: 'Avengers',
      firstAppearance: 'Tales of Suspense #39',
      enemies: ['Mandarin', 'Obadiah Stane'],
      image: 'ironman.jpg'
    };

    const componentRef = {} as ComponentType<any>;
    service.openModal(componentRef, mockHero);

    expect(dialog.open).toHaveBeenCalledWith(componentRef, {
      data: { data: mockHero, isEditing: false },
      width: '70vw'
    });
  });


});
