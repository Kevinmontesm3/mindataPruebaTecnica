import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { ModalHeroService } from '../modal-hero/modal-hero.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalHeroComponent } from '../modal-hero/modal-hero.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let modalService: jasmine.SpyObj<ModalHeroService>;

  beforeEach(() => {
    modalService = jasmine.createSpyObj('ModalHeroService', ['openModal']);

    TestBed.configureTestingModule({
      imports: [MatButtonModule, MatIconModule, MatToolbarModule, ToolbarComponent],
      declarations: [],
      providers: [
        { provide: ModalHeroService, useValue: modalService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openModal of ModalHeroService when openModal is called', () => {
    component.openModal();

    expect(modalService.openModal).toHaveBeenCalledWith(ModalHeroComponent);
  });

  it('should inject ModalHeroService', () => {
    expect(modalService).toBeTruthy();
  });
  it('should not trigger onNewContactEvent on openModal', () => {
    spyOn(component.onNewContactEvent, 'emit');

    component.openModal();

    expect(component.onNewContactEvent.emit).not.toHaveBeenCalled();
  });

});
