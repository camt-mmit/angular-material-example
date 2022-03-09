import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleEventsListComponent } from './google-events-list.component';

describe('GoogleEventsListComponent', () => {
  let component: GoogleEventsListComponent;
  let fixture: ComponentFixture<GoogleEventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleEventsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
