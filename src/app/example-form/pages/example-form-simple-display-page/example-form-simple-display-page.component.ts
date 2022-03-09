import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExampleFormSimpleService } from '../../example-form-simple.service';
import { SimpleFormData } from '../../models';

@Component({
  selector: 'app-example-form-simple-display-page',
  templateUrl: './example-form-simple-display-page.component.html',
  styleUrls: ['./example-form-simple-display-page.component.scss'],
})
export class ExampleFormSimpleDisplayPageComponent implements OnInit {
  value$!: Observable<SimpleFormData>;

  constructor(private readonly formSimpleService: ExampleFormSimpleService) {}

  ngOnInit(): void {
    this.value$ = this.formSimpleService.getValue();
  }
}
