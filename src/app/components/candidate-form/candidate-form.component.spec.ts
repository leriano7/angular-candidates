import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateFormComponent } from './candidate-form.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CandidateFormComponent', () => {
  let component: CandidateFormComponent;
  let fixture: ComponentFixture<CandidateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [AppMaterialModule, NoopAnimationsModule],
      declarations: [CandidateFormComponent],
      schemas : [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CandidateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
