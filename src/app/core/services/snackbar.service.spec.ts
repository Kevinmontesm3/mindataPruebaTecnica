import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        SnackbarService,
        { provide: MatSnackBar, useValue: matSnackBarSpy }
      ],
    });
    service = TestBed.inject(SnackbarService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatSnackBar.open with correct parameters', () => {
    const message = 'Test message';
    const action = 'Undo';

    service.showSnackBar(message, action);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  });

  it('should call MatSnackBar.open with default action if not provided', () => {
    const message = 'Test message';

    service.showSnackBar(message);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'ok', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  });

  it('should not call MatSnackBar.open if the message is empty', () => {
    const emptyMessage = '';

    service.showSnackBar(emptyMessage);

    expect(snackBarSpy.open).not.toHaveBeenCalled();
  });
});
