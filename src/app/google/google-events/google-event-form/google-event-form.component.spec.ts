import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleEventFormComponent } from './google-event-form.component';

describe('GoogleEventFormComponent', () => {
  let component: GoogleEventFormComponent;
  let fixture: ComponentFixture<GoogleEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleEventFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
