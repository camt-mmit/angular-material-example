import { Component, Input, OnInit } from '@angular/core';
import { SimpleFormData } from '../../models';

@Component({
  selector: 'app-example-form-simple-display',
  templateUrl: './example-form-simple-display.component.html',
  styleUrls: ['./example-form-simple-display.component.scss'],
})
export class ExampleFormSimpleDisplayComponent implements OnInit {
  @Input() value: SimpleFormData | null = null;

  constructor() {}

  ngOnInit(): void {
    return;
  }
}
