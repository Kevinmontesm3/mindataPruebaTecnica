import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListHerosComponent } from './list-heros.component';
import { DataService } from 'src/app/core/services/data.service';
import { Superhero } from 'src/app/core/models/superhero.model';
import { GridComponent } from '@shared/components/grid/grid.component';

describe('ListHerosComponent', () => {
  let component: ListHerosComponent;
  let fixture: ComponentFixture<ListHerosComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['sortedHeroes']);

    await TestBed.configureTestingModule({
      imports: [ListHerosComponent, GridComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListHerosComponent);
    component = fixture.componentInstance;
  });

  it('should initialize data with sorted heroes from the service', () => {
    const mockHeroes: Superhero[] = [
      {
        "id": 1,
        "image":"https://firebasestorage.googleapis.com/v0/b/polapp-289c9.appspot.com/o/hros%2Fchapulin-colorado-multimexo.png?alt=media&token=7efd3f67-02a3-4047-8ba6-02eaa3164b0f",
        "name": "Chapulín Colorado",
        "realName": "El Chapulín",
        "origin": "Héroe accidental con corazón noble",
        "powers": [
          "Astucia",
          "Chipote Chillón",
          "Chiquitolina"
        ],
        "weaknesses": [
          "Miedo ocasional",
          "Falta de fuerza física"
        ],
        "city": "Ciudad de México",
        "team": "Ninguno",
        "firstAppearance": "1970-11-01",

        "enemies": [
          "El Tripaseca",
          "El Cuajinais"
        ] },
      { "id": 2,
        "name": "Iron Man",
        "image" : "https://firebasestorage.googleapis.com/v0/b/polapp-289c9.appspot.com/o/hros%2Fironman.jpg?alt=media&token=659e286b-becc-41b7-9d07-c94bf846fe5b",
        "realName": "Tony Stark",
        "origin": "Genio millonario tras un accidente mortal",
        "powers": [
          "Traje de armadura avanzado",
          "Inteligencia tecnológica",
          "Riqueza"
        ],
        "weaknesses": [
          "Dependencia del reactor Arc",
          "Problemas de salud"
        ],
        "city": "Malibu",
        "team": "Los Vengadores",
        "firstAppearance": "1963-03-01",

        "enemies": [
          "Mandarín",
          "Ultrón"
        ]}
    ];

    mockDataService.sortedHeroes.and.returnValue(mockHeroes);

    fixture.detectChanges();

    expect(component.data).toEqual(mockHeroes);
    expect(mockDataService.sortedHeroes).toHaveBeenCalled();
  });

  it('should assign correct columns to displayedColumns', () => {
    expect(component.displayedColumns).toEqual(['image', 'id', 'name', 'realName', 'city', 'origin', 'actions']);
  });

  it('should assign correct sortables to sortables', () => {
    expect(component.sortables).toEqual(['id', 'name', 'realName', 'city', 'origin']);
  });

  it('should not update data if the service returns an empty list', () => {
    const emptyHeroes: Superhero[] = [];

    mockDataService.sortedHeroes.and.returnValue(emptyHeroes);
    fixture.detectChanges();

    expect(component.data).toEqual(emptyHeroes);
  });

});
