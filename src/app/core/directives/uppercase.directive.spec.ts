import { UppercaseDirective } from './uppercase.directive';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `<input type="text" appUppercase>`
})
class TestComponent {}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UppercaseDirective,ReactiveFormsModule],
      declarations: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();
  });

  it('should convert text to uppercase on input', () => {
    inputElement.value = 'hello';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('HELLO');
  });

  it('should not modify text if already in uppercase', () => {
    inputElement.value = 'HELLO';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('HELLO');
  });

  it('should update the value on each input event', () => {
    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('TEST');

    inputElement.value = 'again';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('AGAIN');
  });

  it('should trigger input event after changing the value', () => {
    spyOn(inputElement, 'dispatchEvent');

    inputElement.value = 'new value';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.dispatchEvent).toHaveBeenCalledWith(jasmine.any(Event));
  });
});
