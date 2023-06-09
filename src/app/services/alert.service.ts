import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private _snackBar: MatSnackBar) {}

  success(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['mat-primary'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  error(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['mat-primary'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  info(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['mat-primary'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  warn(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['mat-primary'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
