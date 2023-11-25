import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListComponent],
      schemas : [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
