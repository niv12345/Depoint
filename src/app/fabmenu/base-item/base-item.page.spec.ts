import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseItemPage } from './base-item.page';

describe('BaseItemPage', () => {
  let component: BaseItemPage;
  let fixture: ComponentFixture<BaseItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
