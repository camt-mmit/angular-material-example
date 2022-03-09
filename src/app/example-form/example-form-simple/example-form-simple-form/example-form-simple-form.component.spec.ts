import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFormSimpleFormComponent } from './example-form-simple-form.component';

describe('ExampleFormSimpleFormComponent', () => {
  let component: ExampleFormSimpleFormComponent;
  let fixture: ComponentFixture<ExampleFormSimpleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleFormSimpleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFormSimpleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
