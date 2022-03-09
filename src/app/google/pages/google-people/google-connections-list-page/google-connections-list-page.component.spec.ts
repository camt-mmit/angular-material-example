import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleConnectionsListPageComponent } from './google-connections-list-page.component';

describe('GoogleConnectionsListPageComponent', () => {
  let component: GoogleConnectionsListPageComponent;
  let fixture: ComponentFixture<GoogleConnectionsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleConnectionsListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleConnectionsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
