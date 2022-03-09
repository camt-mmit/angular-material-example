import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  constructor(private readonly snackBar: MatSnackBar) {}

  notify(message: string, isError: boolean = false): void {
    this.snackBar.open(message, undefined, {
      duration: 5000,
      panelClass: isError ? 'snack-bar-warn' : undefined,
    });
  }
}
