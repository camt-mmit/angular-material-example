import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglePersonFormComponent } from './google-person-form.component';

describe('GooglePersonFormComponent', () => {
  let component: GooglePersonFormComponent;
  let fixture: ComponentFixture<GooglePersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GooglePersonFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglePersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
