import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleLoadingComponent } from './google-loading.component';

describe('GoogleLoadingComponent', () => {
  let component: GoogleLoadingComponent;
  let fixture: ComponentFixture<GoogleLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
