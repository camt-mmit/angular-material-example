import { TestBed } from '@angular/core/testing';

import { GooglePeopleService } from './google-people.service';

describe('GooglePeopleService', () => {
  let service: GooglePeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GooglePeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
