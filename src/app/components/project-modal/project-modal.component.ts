import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  public projectForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProjectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project | null, private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      technologies: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.reset();
  }

  // If edition -> we will work on this project object, not in original.
  private cproject: Project | null = null;

  public get operation() : string {
    if(this.cproject == null) {
      return 'Crear';
    }
    return 'Editar';
  }

  public get name() {
    return this.projectForm.get('name');
  }

  public get description() {
    return this.projectForm.get('description');
  }

  public get experience() {
    return this.projectForm.get('experience');
  }

  public get technologies() {
    return this.projectForm.get('technologies') as FormArray;
  }

  public addTechnology = () => {
    this.technologies.push(this.fb.control(''));
  };

  public removeTechnology = (index: number) => {
    this.technologies.removeAt(index);

  };

  public reset = () => {
    if (this.data) {
      this.cproject = Object.assign({}, this.data);
    } else {
      this.cproject = null;
    }
    this.projectForm.reset();
    this.technologies.clear();
    if (this.cproject) { // We are in edition
      const technologies = [];
      if (Array.isArray(this.cproject.technology)) {
        this.cproject.technology.forEach((thisTech, index) => {
          technologies.push(thisTech); // Add string to array of strings
          this.addTechnology(); // Add control to FormArray
        });
      } else {
        technologies.push('');
        this.addTechnology();
      }
      const resetValue = {
        name: this.cproject.name,
        description: this.cproject.description,
        experience: this.cproject.experience,
        technologies,
      };
      this.projectForm.setValue(resetValue);
    }
  };

  private cleanBlankTechs(techs: Array<string>) : Array < string > {
    return techs.filter((thisTech) => {
      return (thisTech.trim().length > 0);
    });
  }

  /*
  // We must capture before close in View
  const newTechs = this.cleanBlankTechs(this.candidateForm.value.technologies);
  this.candidateForm.value.skills = newSkills;
  const savedCandidate: Candidate = Object.assign(
    {},
    this.candidate,
    this.candidateForm.value
  );
  this.candidateSubmitter.emit(savedCandidate);
  */

  public cancel = (): void => {
    this.dialogRef.close();
  };

  public onSubmit = () => {
    // Nothing to DO. It will be handled via mat-dialog-close.
  };
}
