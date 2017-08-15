/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaddebtsComponent } from './baddebts.component';

describe('BaddebtsComponent', () => {
  let component: BaddebtsComponent;
  let fixture: ComponentFixture<BaddebtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaddebtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaddebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
