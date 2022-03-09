import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { SimpleFormComponent } from './simple-form.component';

export type FormActionType = 'process' | 'cancel';

@Directive({
  selector: '[appSimpleFormAction]',
  exportAs: 'simpleFormAction',
})
export class SimpleFormActionDirective {
  @Input() appSimpleFormAction!: FormActionType;
  @Input() name: string | null = null;

  @HostBinding('attr.type') get type(): string {
    return this.appSimpleFormAction === 'process' ? 'submit' : 'button';
  }

  get processing(): boolean {
    return (
      this.simpleForm.processing &&
      this.simpleForm.processingFormAction === this
    );
  }

  constructor(private readonly simpleForm: SimpleFormComponent<unknown>) {}

  @HostListener('click')
  onClick(): void {
    this.simpleForm.setFormAction(this);
  }
}
