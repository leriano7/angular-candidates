import { Inject, Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from 'src/config/app.config';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  constructor(@Inject(APP_CONFIG) config: AppConfig) { 
    this.candidates = Array.isArray(config.candidates) ? config.candidates : [];
    this.subject = new BehaviorSubject(this.candidates);
  }

  private candidates : Candidate[] = [];
  private subject!: BehaviorSubject<Candidate[]>;

  public getCandidates = (): Observable<Candidate[]> => {
    return this.subject.asObservable();
  }

  private notify() {
    this.subject.next(this.candidates);
  }
}
