import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFormSimpleDisplayComponent } from './example-form-simple-display.component';

describe('ExampleFormSimpleDisplayComponent', () => {
  let component: ExampleFormSimpleDisplayComponent;
  let fixture: ComponentFixture<ExampleFormSimpleDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleFormSimpleDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFormSimpleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
