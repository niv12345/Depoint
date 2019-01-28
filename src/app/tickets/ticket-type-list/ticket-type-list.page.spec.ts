import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTypeListPage } from './ticket-type-list.page';

describe('TicketTypeListPage', () => {
  let component: TicketTypeListPage;
  let fixture: ComponentFixture<TicketTypeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketTypeListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTypeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
