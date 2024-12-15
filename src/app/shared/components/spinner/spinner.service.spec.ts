import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize isLoading as false', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('should set isLoading to true when show is called', () => {
    service.show();
    expect(service.isLoading()).toBe(true);
  });

  it('should set isLoading to true when show is called', () => {
    service.show();
    expect(service.isLoading()).toBe(true);
  });
  it('should set isLoading to false when hide is called', () => {
    service.show();
    service.hide();
    expect(service.isLoading()).toBe(false);
  });

  it('should toggle isLoading correctly with show and hide', () => {
    service.show();
    expect(service.isLoading()).toBe(true);

    service.hide();
    expect(service.isLoading()).toBe(false);

    service.show();
    expect(service.isLoading()).toBe(true);
  });
  it('should not change isLoading state if it is already false when hide is called', () => {
    service.hide();
    expect(service.isLoading()).toBe(false);
  });

});
