import { TestBed } from '@angular/core/testing';

import { CandidatesService } from './candidates.service';
import { APP_CONFIG, Config } from 'src/config/app.config';
import { Candidate } from '../models/candidate';
import { Experience } from '../models/experience';
import { mergeMap, switchMap } from 'rxjs';

describe('CandidatesService', () => {
  let service: CandidatesService;

  const selfCandidates: Candidate[] = [{
    id: 1,
    name: 'Ismael',
    surname: 'López Quintero',
    email: 'correo@correo.com',
    experience: Experience.Senior,
    skills : [],
    previousProjects: [],
    age: 40
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: APP_CONFIG,
        useValue: Config
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
      //expect(retrieved[2].name).toBe('Paco');
    });
  });

  it("allows to retrieve self one candidate", () => {
    service = new CandidatesService({
      candidates: selfCandidates
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

  it("allows to create a new candidate", (done) => {
    const newCandidate: Candidate = {
      name: 'Miguel',
      surname: 'Rodríguez Fernández',
      email: 'correo2@correo.com',
      experience: Experience.Midlevel,
      skills : [],
      previousProjects: []
    };

    service.save(newCandidate)
      .pipe(switchMap(() => service.getCandidates()))
      .subscribe({
        next: (candidates) => {
          // switchMap -> getCandidates is necessary
          const nCandidates = candidates.length;
          const lastCandidate = candidates[nCandidates - 1];
          expect(lastCandidate.id).toBeDefined();
          expect(lastCandidate.surname).toBe('Rodríguez Fernández');
          done();
        },
        error: () => {
          done.fail();
        }
      });
  });

  it("allows to update a candidate", (done) => {
    const candidateToUpdate: Candidate = {
      id: 1,
      email: "candidateguay@email.com",
      name: 'Prueba',
      previousProjects: [
        {
          name: "BBVA",
          technology: ["ReactJS", "JQuery"],
          description:
            "Programador encargado de correcciones en la página web de venta privada",
          experience: 1
        }
      ],
      experience: Experience.Senior,
      skills : [],
      surname: "Martínez"
    }

    service.update(candidateToUpdate)
      .pipe(mergeMap(() => service.getCandidates()))
      .subscribe((candidates) => {
        console.log(candidates);
        console.log(candidateToUpdate);
        expect(candidates[1].previousProjects).toEqual(candidateToUpdate.previousProjects);
        done();
      });
  });

  it("allows to delete a candidate", (done) => {
    service.remove(2)
      .pipe(mergeMap(() => service.getCandidates()))
      .subscribe({
        next: (candidates) => {
          const index = candidates.findIndex((c) => c.id === 2);
          expect(index).toBe(-1);
          done();
        },
        error: (error) => {
          done.fail();
        }
      });
  });
});
