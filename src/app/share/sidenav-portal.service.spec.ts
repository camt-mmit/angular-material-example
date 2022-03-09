import { TestBed } from '@angular/core/testing';

import { SidenavPortalService } from './sidenav-portal.service';

describe('SidenavPortalService', () => {
  let service: SidenavPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
