import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidate } from 'src/app/models/candidate';
import { Project } from 'src/app/models/project';
import { linkedinPattern, phonePattern } from 'src/app/utils/validators';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateFormComponent implements OnInit {
  public candidateForm!: FormGroup;
  
  // For edition -> reset purposes
  private initialProjects! : Project[] | null;

  // For creation -> save created projects until save or reset
  private createdProjects! : Project[];

  constructor(private fb: FormBuilder) {
    this.candidateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(phonePattern)]],
      linkedIn: ['', [Validators.pattern(linkedinPattern)]],
      experience: ['', [Validators.required]],
      skills: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.initialProjects = (this.candidate?.previousProjects) ? ([] as Array<Project>).concat(this.candidate.previousProjects) : null;
    this.reset();
  }

  @Input() candidate: Candidate | null = null;
  @Output() candidateSubmitter = new EventEmitter<Candidate>();
  @Output() backEmitter = new EventEmitter();

  public get name() {
    return this.candidateForm.get('name');
  }

  public getNameErrors() {
    if (this.name?.hasError('required')) {
      return 'Debe introducir un nombre.';
    }
    return this.name?.hasError('minlength')
      ? 'El nombre debe tener al menos 2 carácteres'
      : '';
  }

  public get surname() {
    return this.candidateForm.get('surname');
  }

  public getSurnameErrors() {
    if (this.name?.hasError('required')) {
      return 'Debe introducir los apellidos.';
    }
    return this.name?.hasError('minlength')
      ? 'Los apellidos debe tener al menos 2 carácteres'
      : '';
  }

  public get email() {
    return this.candidateForm.get('email');
  }

  public getEmailErrors() {
    if (this.email?.hasError('required')) {
      return 'Debe introducir un email.';
    }
    return this.email?.hasError('email')
      ? 'Debe introducir un email correcto'
      : '';
  }

  public get phone() {
    return this.candidateForm.get('phone');
  }

  public getPhoneErrors() {
    return this.phone?.hasError('pattern')
      ? 'Debe introducir un teléfono correcto, ej (+34555667788)'
      : '';
  }

  public get linkedin() {
    return this.candidateForm.get('linkedIn');
  }

  public getLinkedinErrors() {
    return this.linkedin?.hasError('pattern')
      ? 'Debe introducir un perfil de linkedin correcto'
      : '';
  }

  public get experience() {
    return this.candidateForm.get('experience');
  }

  public getExperienceErrors() {
    return this.experience?.hasError('required')
      ? 'Debe seleccionar la experiencia'
      : '';
  }

  public get skills() {
    return this.candidateForm.get('skills') as FormArray;
  }

  public get projectsModel() : Project[] {
    if(this.candidate?.previousProjects) {
      // If editing candidate
      return this.candidate.previousProjects
    }
    // If creating candidate      
    return this.createdProjects;
  }

  public onSubmit = () => {
    const newSkills = this.cleanBlankSkills(this.candidateForm.value.skills);
    this.candidateForm.value.skills = newSkills;
    const savedCandidate: Candidate = Object.assign(
      {},
      this.candidate,
      this.candidateForm.value
    );
    if(this.candidate==null) {
      // Add created projects to new candidate
      savedCandidate.previousProjects = this.createdProjects;
    }
    this.candidateSubmitter.emit(savedCandidate);
  };

  public goBack = () => {
    this.backEmitter.emit();
  };

  public reset = () => {
    this.candidateForm.reset();
    this.createdProjects = [];
    this.skills.clear();
    if (this.candidate) {
      const skills = [];
      if (Array.isArray(this.candidate.skills)) {
        this.candidate.skills.forEach((skill, index) => {
          skills.push(skill); // Add string to array of strings
          this.addSkill(); // Add control to FormArray
        });
      } else {
        skills.push('');
        this.addSkill();
      }
      const resetValue = {
        name: this.candidate.name,
        surname: this.candidate.surname,
        email: this.candidate.email,
        phone: this.candidate.phone ? this.candidate.phone : null,
        linkedIn: this.candidate.linkedIn ? this.candidate.linkedIn : null,
        experience: this.candidate.experience,
        skills,
      };
      this.candidateForm.setValue(resetValue);
      // Only if edition -> this.candidate
      if(this.initialProjects) {
        this.candidate.previousProjects = ([] as Array<Project>).concat(this.initialProjects as Array<Project>);
      } else {
        this.candidate.previousProjects = [];
      }
    }
  };

  public addSkill = () => {
    this.skills.push(this.fb.control(''));
  };

  public removeSkill = (index: number) => {
    this.skills.removeAt(index);
  };

  private cleanBlankSkills(skills: Array<string>) : Array<string> {
    return skills.filter((thisSkill) => {
      return (thisSkill.trim().length > 0);
    });
  }
}
