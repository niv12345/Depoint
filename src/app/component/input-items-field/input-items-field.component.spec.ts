import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputItemsFieldComponent } from './input-items-field.component';

describe('InputItemsFieldComponent', () => {
  let component: InputItemsFieldComponent;
  let fixture: ComponentFixture<InputItemsFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputItemsFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputItemsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
