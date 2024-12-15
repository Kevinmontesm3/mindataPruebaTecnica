import { TestBed } from '@angular/core/testing';
import { ModalHeroComponent } from './modal-hero.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/core/services/data.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Superhero } from 'src/app/core/models/superhero.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalHeroComponent', () => {
  let component: ModalHeroComponent;
  let fixture: any;
  let dataService: DataService;
  let snackbarService: SnackbarService;
  let dialogRef: MatDialogRef<ModalHeroComponent>;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule,ModalHeroComponent, BrowserAnimationsModule],

      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockHero },
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') }
        },
        DataService,
        SnackbarService,
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalHeroComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    snackbarService = TestBed.inject(SnackbarService);
    dialogRef = TestBed.inject(MatDialogRef);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form on init', () => {
    expect(component.heroForm).toBeDefined();
    expect(component.heroForm.get('name')).toBeTruthy();
    expect(component.heroForm.get('powers')).toBeTruthy();
  });

  it('should add a new power to the form', () => {
    component.addPower();
    expect(component.powers.length).toBe(2);
  });

  it('should cancel and close the dialog without saving changes', () => {
    component.cancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });


  it('should remove a power from the form', () => {
    component.addPower();
    component.removePower(0);
    expect(component.powers.length).toBe(1);
  });

  it('should cancel and close the dialog with false', () => {
    component.cancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });
});
