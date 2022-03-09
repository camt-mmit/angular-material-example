import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthorizationPageComponent } from './google-authorization-page.component';

describe('GoogleAuthorizationPageComponent', () => {
  let component: GoogleAuthorizationPageComponent;
  let fixture: ComponentFixture<GoogleAuthorizationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleAuthorizationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAuthorizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
