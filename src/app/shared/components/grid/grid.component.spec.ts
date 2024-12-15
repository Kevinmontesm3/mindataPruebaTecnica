import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GridComponent } from './grid.component';
import { DataService } from 'src/app/core/services/data.service';


describe('GridComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        GridComponent
      ],
      providers: [DataService]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GridComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
