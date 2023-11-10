import { TestBed } from '@angular/core/testing';

import { CandidatesService } from './candidates.service';
import { APP_CONFIG, Config } from 'src/config/app.config';
import { Candidate } from '../models/candidate';
import { Experience } from '../models/experience';

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
      expect(retrieved.length).toBe(3);
    });
  });

  it("allows to retrieve self one candidate", () => {
    let gotCandidate : Candidate;
    service = new CandidatesService({
      candidates : selfCandidates
    });
    service.getCandidates().subscribe((retrieved) => {
      gotCandidate = retrieved[0];
      expect(retrieved.length).toBe(1);
    });

    expect(gotCandidate!.email).toBe('correo@correo.com');
  });

  it("allows to retrieve empty candidates", () => {
    let gotCandidate : Candidate;
    service = new CandidatesService({});
    service.getCandidates().subscribe((retrieved) => {
      debugger
      expect(retrieved.length).toBe(0);
    });
  });

  it("allows to create a new candidate", () => {});

  it("allows to delete a candidate", () => {});

  it("allows to update a candidate", () => {});

});
