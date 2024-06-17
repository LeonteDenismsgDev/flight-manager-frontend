import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditModeService {
  private booleanSubject = new BehaviorSubject<boolean>(false);
  editMode$ = this.booleanSubject.asObservable();

  constructor() { }

  switchEditMode(value: boolean) {
    this.booleanSubject.next(value);
  }
}
