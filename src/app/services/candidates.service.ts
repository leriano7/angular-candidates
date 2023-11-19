import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';
import { Observable, of, take, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private http: HttpClient){}

  private api = "http://ubuntuserver:3000/api";

  public getCandidates = (): Observable<Candidate[]> => {
    return this.http.get<Candidate[]>(`${this.api}/candidates`);
  }

  public getCandidate = (id: number) : Observable<Candidate> => {
    return this.http.get<Candidate>(`${this.api}/candidates/${id}`);
  }

  public save = (candidate : Candidate) : Observable<Candidate> => {
    return this.http.post<Candidate>(`${this.api}/candidates`,candidate,{
      headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      }
    });
  };

  public update = (candidate : Candidate) : Observable<Candidate> => {
    if (typeof(candidate.id) === 'number') {
      return this.http.put<Candidate>(`${this.api}/candidates/${candidate.id}`,candidate,{
        headers : {
          "Accept" : "application/json",
          "Content-Type" : "application/json"
        }
      });
    }
    const submessage = candidate.id ? ''+candidate.id : 'No ID';
    const errorResponse = {
      status : 404,
      error : new Error('Not found in update '+submessage),
      message : 'Not found in update '+submessage
    };
    return throwError(() => errorResponse);
  };

  public remove = (id: number) => {
    return this.http.delete(`${this.api}/candidates/${id}`);
  }

  private getNextId = () : Observable<number> => {
    let obs : Observable<number>;


    return obs;



    this.getCandidates()
      .pipe(take(1))
      .subscribe((candidates)=>{
        return of(0);

      });

      /*
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
    */
  };
}
