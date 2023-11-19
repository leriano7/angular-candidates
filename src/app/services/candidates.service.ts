import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';
import { BehaviorSubject, Observable, of, switchMap, take, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  private api = "http://ubuntuserver:3000/api";
  private idsBeahvior: BehaviorSubject<number>;

  constructor(private http: HttpClient) {
    this.idsBeahvior = new BehaviorSubject<number>(0);
  }

  public getCandidates = (): Observable<Candidate[]> => {
    return this.http.get<Candidate[]>(`${this.api}/candidates`);
  }

  public getCandidate = (id: number): Observable<Candidate> => {
    return this.http.get<Candidate>(`${this.api}/candidates/${id}`);
  }

  public save = (candidate: Candidate): Observable<Candidate> => {
    console.log('SAVE =============> ');
    return this.getNextId()
      .pipe(
        take(1),
        switchMap( (value) =>
          {
            console.log('SAVE recibido =============> ' + value);
            candidate.id = value;
            return this.http.post<Candidate>(
              `${this.api}/candidates`,
              candidate, {
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              }
            })
          }
        )
      );
  };

  public update = (candidate: Candidate): Observable<Candidate> => {
    if (typeof (candidate.id) === 'number') {
      return this.http.put<Candidate>(`${this.api}/candidates/${candidate.id}`, candidate, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
    }
    const submessage = candidate.id ? '' + candidate.id : 'No ID';
    const errorResponse = {
      status: 404,
      error: new Error('Not found in update ' + submessage),
      message: 'Not found in update ' + submessage
    };
    return throwError(() => errorResponse);
  };

  public remove = (id: number) => {
    return this.http.delete(`${this.api}/candidates/${id}`);
  }

  private getNextId = (): Observable<number> => {
    // Not working OK
    // let obs = new Observable<number>().toPromise();
    console.log('GNI ============> ');
    this.getCandidates()
      .pipe(take(1))
      .subscribe((candidates) => {
        console.log('GNI ============> '+ JSON.stringify(candidates));
        let max: number = 0;
        if (candidates) {
          for (let i in candidates) {
            const thisCandidate = candidates[i];
            const thisId = thisCandidate.id ? thisCandidate.id : 0;
            if (thisId > max) {
              max = thisId;
            }
          }
        }
        console.log('GNI returns ============> '+ (max+1));
        this.idsBeahvior.next(max + 1);
      });
    return this.idsBeahvior;
  };
}
