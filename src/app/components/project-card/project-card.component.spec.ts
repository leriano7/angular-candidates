import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardComponent } from './project-card.component';
import { AppMaterialModule } from 'src/app/app-material.module';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [AppMaterialModule],
      declarations: [ProjectCardComponent]
    });
    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.project = {
      name : 'Angulando',
      description : 'Un proyecto en angular',
      technology : ['Angular','CSS'],
      experience : 2
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
