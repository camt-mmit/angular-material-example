import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleConnectionsListComponent } from './google-connections-list.component';

describe('GoogleConnectionsListComponent', () => {
  let component: GoogleConnectionsListComponent;
  let fixture: ComponentFixture<GoogleConnectionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleConnectionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleConnectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
