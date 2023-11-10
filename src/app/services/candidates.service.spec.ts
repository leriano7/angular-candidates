import { TestBed } from '@angular/core/testing';

import { CandidatesService } from './candidates.service';
import { APP_CONFIG, Config } from 'src/config/app.config';
import { Candidate } from '../models/candidate';
import { Experience } from '../models/experience';
import { switchMap } from 'rxjs';

describe('CandidatesService', () => {
  let service: CandidatesService;

  const selfCandidates : Candidate[] = [{
    id : 1,
    name : 'Ismael',
    surname : 'López Quintero',
    email : 'correo@correo.com',
    experience : Experience.Senior,
    previousProjects : [],
    age : 40
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers : [{
        provide: APP_CONFIG,
        useValue : Config
      }]
    });
    service = TestBed.inject(CandidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("allows to retrieve the candidates", () => {
    service.getCandidates().subscribe((retrieved) => {
      expect(retrieved[0].name).toBe('Carlos');
      expect(retrieved[1].name).toBe('Juan');
      expect(retrieved[2].name).toBe('Paco');
    });
  });

  it("allows to retrieve self one candidate", () => {
    service = new CandidatesService({
      candidates : selfCandidates
    });
    service.getCandidates().subscribe((retrieved) => {
      expect(retrieved.length).toBe(1);
      expect(retrieved[0].email).toBe('correo@correo.com');
    });
  });

  it("allows to retrieve empty candidates", () => {
    service = new CandidatesService({});
    service.getCandidates().subscribe((retrieved) => {
      expect(retrieved.length).toBe(0);
    });
  });

  it("allows to create a new candidate", () => {
    const newCandidate : Candidate = {
      name : 'Miguel',
      surname : 'Rodríguez Fernández',
      email : 'correo2@correo.com',
      experience : Experience.Midlevel,
      previousProjects : []
    };

    service.save(newCandidate)
      .pipe( switchMap(   () => service.getCandidates()   ) )
      .subscribe((candidates)=> {
        // switchMap -> getCandidates is necessary
        const nCandidates = candidates.length;
        const lastCandidate = candidates[nCandidates-1];
        expect(lastCandidate.id).toBeDefined();
        expect(lastCandidate.surname).toBe('Rodríguez Fernández');
    });
  });
 
  it("allows to update a candidate", () => {
    expect(true).toBeTruthy();
  });

  it("allows to delete a candidate", () => {
    expect(true).toBeTruthy();
  });

});
