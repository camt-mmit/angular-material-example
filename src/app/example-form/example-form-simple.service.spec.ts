import { TestBed } from '@angular/core/testing';

import { ExampleFormSimpleService } from './example-form-simple.service';

describe('ExampleFormSimpleService', () => {
  let service: ExampleFormSimpleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleFormSimpleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
