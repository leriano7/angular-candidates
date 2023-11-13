import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidate } from 'src/app/models/candidate';
import { linkedinPattern, phonePattern } from 'src/app/utils/validators';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class CandidateFormComponent {

  public candidateForm! : FormGroup;

  constructor(private fb: FormBuilder){
    this.candidateForm = this.fb.group({
      name : ["", Validators.required, Validators.minLength(2)],
      surname : ["", Validators.required, Validators.minLength(2)],
      email : ["", Validators.required, Validators.email],
      phone : ["", Validators.pattern(phonePattern)],
      linkedIn : ["", Validators.pattern(linkedinPattern)],
      experience : ["", Validators.required]  
    });
  }

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

  public onSubmit = () => {
    // TODO: we should check here
    const savedCandidate : Candidate = Object.assign({}, this.candidateForm.value);
    this.candidateSubmitter.emit(savedCandidate);
  };

  public goBack = () => {
    this.backEmitter.emit();
  };

  public reset = () => {
    this.candidateForm.reset();
  };
}
