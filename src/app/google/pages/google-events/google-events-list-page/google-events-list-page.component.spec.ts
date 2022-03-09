import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleEventsListPageComponent } from './google-events-list-page.component';

describe('GoogleEventsListPageComponent', () => {
  let component: GoogleEventsListPageComponent;
  let fixture: ComponentFixture<GoogleEventsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleEventsListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleEventsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
