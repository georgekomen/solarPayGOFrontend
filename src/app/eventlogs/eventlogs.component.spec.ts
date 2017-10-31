/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventlogsComponent } from './eventlogs.component';

describe('EventlogsComponent', () => {
  let component: EventlogsComponent;
  let fixture: ComponentFixture<EventlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
