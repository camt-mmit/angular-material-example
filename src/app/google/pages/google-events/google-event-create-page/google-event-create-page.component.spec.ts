import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleEventCreatePageComponent } from './google-event-create-page.component';

describe('GoogleEventCreatePageComponent', () => {
  let component: GoogleEventCreatePageComponent;
  let fixture: ComponentFixture<GoogleEventCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleEventCreatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleEventCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
