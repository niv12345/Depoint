import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabmenuListPage } from './fabmenu-list.page';

describe('FabmenuListPage', () => {
  let component: FabmenuListPage;
  let fixture: ComponentFixture<FabmenuListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabmenuListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabmenuListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
