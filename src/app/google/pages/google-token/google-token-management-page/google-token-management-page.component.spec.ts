import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleTokenManagementPageComponent } from './google-token-management-page.component';

describe('GoogleTokenManagementPageComponent', () => {
  let component: GoogleTokenManagementPageComponent;
  let fixture: ComponentFixture<GoogleTokenManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleTokenManagementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleTokenManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
