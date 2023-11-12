import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidate } from 'src/app/models/candidate';
import { linkedinPattern, phonePattern } from 'src/app/utils/validators';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
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

  public get surname() {
    return this.candidateForm.get("surname");
  }

  public get email() {
    return this.candidateForm.get("email");
  }

  public get phone() {
    return this.candidateForm.get("phone");
  }

  public get linkedin() {
    return this.candidateForm.get("linkedIn");
  }

  public get experience() {
    return this.candidateForm.get("experience");
  }

  public onSubmit = () => {
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
