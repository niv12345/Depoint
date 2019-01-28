import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontViewPage } from './front-view.page';

describe('FrontViewPage', () => {
  let component: FrontViewPage;
  let fixture: ComponentFixture<FrontViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
