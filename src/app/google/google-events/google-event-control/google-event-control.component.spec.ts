import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleEventControlComponent } from './google-event-control.component';

describe('GoogleEventControlComponent', () => {
  let component: GoogleEventControlComponent;
  let fixture: ComponentFixture<GooglEventControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleEventControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleEventControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
