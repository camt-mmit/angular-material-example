import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appSimpleFormOptions]',
})
export class SimpleFormOptionsDirective {
  private _hideCancel: boolean = false;
  @Input()
  get hideCancel(): boolean {
    return this._hideCancel;
  }
  set hideCancel(value: BooleanInput) {
    this._hideCancel = coerceBooleanProperty(value);
  }

  constructor() {}
}
