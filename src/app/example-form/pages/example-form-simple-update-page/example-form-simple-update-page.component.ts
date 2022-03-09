import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, takeLast } from 'rxjs';
import { FormProcessActions } from 'src/app/share/simple-form/simple-form.component';
import { ExampleFormSimpleService } from '../../example-form-simple.service';
import { SimpleFormData } from '../../models';

@Component({
  selector: 'app-example-form-simple-update-page',
  templateUrl: './example-form-simple-update-page.component.html',
  styleUrls: ['./example-form-simple-update-page.component.scss'],
})
export class ExampleFormSimpleUpdatePageComponent implements OnInit {
  value$!: Observable<SimpleFormData>;

  constructor(private readonly formSimpleService: ExampleFormSimpleService) {}

  ngOnInit(): void {
    this.value$ = this.formSimpleService.getValue();
  }

  onValueChange(process: FormProcessActions<SimpleFormData>): void {
    this.formSimpleService
      .setValue(process.data)
      .pipe(takeLast(1))
      .subscribe(() => {
        process.success('Update successfully');
      });
  }
}
