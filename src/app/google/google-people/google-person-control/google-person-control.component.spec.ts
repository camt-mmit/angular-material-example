import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglePersonControlComponent } from './google-person-control.component';

describe('GooglePersonControlComponent', () => {
  let component: GooglePersonControlComponent;
  let fixture: ComponentFixture<GooglePersonControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GooglePersonControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglePersonControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
