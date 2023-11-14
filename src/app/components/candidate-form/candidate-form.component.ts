import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidate } from 'src/app/models/candidate';
import { linkedinPattern, phonePattern } from 'src/app/utils/validators';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class CandidateFormComponent implements OnInit {

  public candidateForm! : FormGroup;

  constructor(private fb: FormBuilder) {
    this.candidateForm = this.fb.group({
      name : ["", [Validators.required, Validators.minLength(2)]],
      surname : ["", [Validators.required, Validators.minLength(2)]],
      email : ["", [Validators.required, Validators.email]],
      phone : ["", [Validators.pattern(phonePattern)]],
      linkedIn : ["", [Validators.pattern(linkedinPattern)]],
      experience : ["", [Validators.required]],
      skills : this.fb.array([])
    });
  }
  ngOnInit(): void {
    this.reset();
  }

  @Input() candidate: Candidate | null = null;

  @Output() candidateSubmitter = new EventEmitter<Candidate>();
  @Output() backEmitter = new EventEmitter();
  

  public get name() {
    return this.candidateForm.get("name");
  }

  public getNameErrors() {
    if (this.name?.hasError("required")) {
      return "Debe introducir un nombre.";
    }
    return this.name?.hasError("minlength")
      ? "El nombre debe tener al menos 2 carácteres"
      : "";
  }

  public get surname() {
    return this.candidateForm.get("surname");
  }

  public getSurnameErrors() {
    if (this.name?.hasError("required")) {
      return "Debe introducir los apellidos.";
    }
    return this.name?.hasError("minlength")
      ? "Los apellidos debe tener al menos 2 carácteres"
      : "";
  }

  public get email() {
    return this.candidateForm.get("email");
  }

  public getEmailErrors() {
    if (this.email?.hasError("required")) {
      return "Debe introducir un email.";
    }
    return this.email?.hasError("email")
      ? "Debe introducir un email correcto"
      : "";
  }

  public get phone() {
    return this.candidateForm.get("phone");
  }

  public getPhoneErrors() {
    return this.phone?.hasError("pattern")
      ? "Debe introducir un teléfono correcto, ej (+34555667788)"
      : "";
  }

  public get linkedin() {
    return this.candidateForm.get("linkedIn");
  }

  public getLinkedinErrors() {
    return this.linkedin?.hasError("pattern")
      ? "Debe introducir un perfil de linkedin correcto"
      : "";
  }

  public get experience() {
    return this.candidateForm.get("experience");
  }

  public getExperienceErrors() {
    return this.experience?.hasError("required")
      ? "Debe seleccionar la experiencia"
      : "";
  }

  public get skills() {
    return this.candidateForm.get('skills') as FormArray;
  }

  public onSubmit = () => {
    const savedCandidate : Candidate = Object.assign({}, this.candidate, this.candidateForm.value);
    this.candidateSubmitter.emit(savedCandidate);
  };

  public goBack = () => {
    this.backEmitter.emit();
  };

  public reset = () => {
    this.candidateForm.reset();
    if (this.candidate) {
      const skills = [];
      if(Array.isArray(this.candidate.skills)) {
        this.candidate.skills.forEach((skill, index)=>{
          skills.push(skill); // Add string to array os strings
          this.addSkill(); // Add control to FormArray
        });
      } else {
        skills.push('');
        this.addSkill();
      }
      this.candidateForm.setValue({
        name: this.candidate.name,
        surname: this.candidate.surname,
        email: this.candidate.email,
        phone: this.candidate.phone ? this.candidate.phone : null,
        linkedIn: this.candidate.linkedIn ? this.candidate.linkedIn : null,
        experience: this.candidate.experience,
        skills
      });
    }
  };

  public addSkill = () => {
    this.skills.push(this.fb.control(''));
  }

  public removeSkill = (index: number) => {
    this.skills.removeAt(index);
  }

}
