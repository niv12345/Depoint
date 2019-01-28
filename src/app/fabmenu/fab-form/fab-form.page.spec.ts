import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabFormPage } from './fab-form.page';

describe('FabFormPage', () => {
  let component: FabFormPage;
  let fixture: ComponentFixture<FabFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
