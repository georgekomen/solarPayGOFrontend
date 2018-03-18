/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IssueRecordComponent } from './issue-record.component';

describe('IssueRecordComponent', () => {
  let component: IssueRecordComponent;
  let fixture: ComponentFixture<IssueRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
