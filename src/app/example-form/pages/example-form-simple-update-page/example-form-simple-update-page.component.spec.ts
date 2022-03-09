import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFormSimpleUpdatePageComponent } from './example-form-simple-update-page.component';

describe('ExampleFormSimpleUpdatePageComponent', () => {
  let component: ExampleFormSimpleUpdatePageComponent;
  let fixture: ComponentFixture<ExampleFormSimpleUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleFormSimpleUpdatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFormSimpleUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
