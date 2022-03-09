import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFormSimpleControlComponent } from './example-form-simple-control.component';

describe('ExampleFormSimpleControlComponent', () => {
  let component: ExampleFormSimpleControlComponent;
  let fixture: ComponentFixture<ExampleFormSimpleControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExampleFormSimpleControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFormSimpleControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
