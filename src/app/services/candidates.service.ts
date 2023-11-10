import { Inject, Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
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

  public save = (candidate : Candidate) : Observable<Candidate> => {
    const nextId = this.getNextId();
    const savedCandidate = Object.assign({}, candidate, { id : nextId });
    this.candidates.push(savedCandidate);
    this.notify();
    return of(savedCandidate);
  };

  public update = (candidate : Candidate) : Observable<Candidate> => {
    if((candidate.id) && (typeof(candidate.id) === 'number')) {
      // We have a candidate with id to look for...
      const index = this.candidates.findIndex((c) => c.id === candidate.id);
      if(index>-1) {
        const temp = this.candidates[index];
        this.candidates[index] = Object.assign({},temp,candidate);
        return of(this.candidates[index]);
      }
    }
    const errorResponse = {
      status : 404,
      error : new Error('Not found in update'),
      message : 'Not found in update'
    };
    return throwError(() => errorResponse);
  };

  private getNextId = () => {
    let max : number = 0;
    if (this.candidates) {
      for (let i in this.candidates) {
        const thisCandidate = this.candidates[i];
        const thisId = thisCandidate.id ? thisCandidate.id : 0;
        if (thisId > max) {
          max = thisId;
        }
      }
    }
    return max + 1;
  };

  private notify() {
    this.subject.next(this.candidates);
  }
}
