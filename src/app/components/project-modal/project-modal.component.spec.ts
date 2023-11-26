import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectModalComponent } from './project-modal.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProjectModalComponent', () => {
  let component: ProjectModalComponent;
  let fixture: ComponentFixture<ProjectModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [AppMaterialModule,  NoopAnimationsModule],
      declarations: [ProjectModalComponent],
      providers : [{
        provide : MAT_DIALOG_DATA,
        useValue: {
          name: 'Nombre',
          description: 'Descripción',
          experience: 2,
          technology : ['UnaTec']
        }
      },{
        provide : MatDialogRef<ProjectModalComponent>,
        useValue : {}
      }],
      schemas : [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
