import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFormSimpleDisplayPageComponent } from './example-form-simple-display-page.component';

describe('ExampleFormSimpleDisplayPageComponent', () => {
  let component: ExampleFormSimpleDisplayPageComponent;
  let fixture: ComponentFixture<ExampleFormSimpleDisplayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleFormSimpleDisplayPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFormSimpleDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
