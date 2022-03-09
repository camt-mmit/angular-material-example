import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { parseSimpleFormData, SimpleFormData } from './models';

const dataKey = 'example-form-simple';

@Injectable({
  providedIn: 'root',
})
export class ExampleFormSimpleService {
  private value: SimpleFormData;

  constructor() {
    const valueText = localStorage.getItem(dataKey);
    if (valueText) {
      this.value = parseSimpleFormData(JSON.parse(valueText));
    } else {
      this.value = parseSimpleFormData({
        firstname: null,
        lastname: null,
        gender: null,
        birthdate: null,
      });
    }
  }

  private sync() {
    const storedValue = {
      ...this.value,
      birthdate: this.value.birthdate
        ? this.value.birthdate.toISOString()
        : this.value.birthdate,
    };
    localStorage.setItem(dataKey, JSON.stringify(storedValue));
  }

  getValue(): Observable<SimpleFormData> {
    return of(this.value);
  }

  setValue(value: SimpleFormData): Observable<SimpleFormData> {
    this.value = value;
    this.sync();

    return this.getValue();
  }
}
