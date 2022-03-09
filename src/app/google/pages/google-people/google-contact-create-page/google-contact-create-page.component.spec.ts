import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleContactCreatePageComponent } from './google-contact-create-page.component';

describe('GoogleContactCreatePageComponent', () => {
  let component: GoogleContactCreatePageComponent;
  let fixture: ComponentFixture<GoogleContactCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleContactCreatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleContactCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
