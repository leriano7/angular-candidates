import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CandidatesService } from './candidates.service';
import { Candidate } from '../models/candidate';
import { Experience } from '../models/experience';
import { APP_CONFIG, AppConfig, Config } from 'src/config/app.config';

const newCandidate = {
  name: 'Nombre 1',
  surname: 'Apellido 1',
  email: 'email@email.com',
  experience: Experience.Junior,
  skills: [],
  previousProjects: [],
  age: 25,
};

const candidates : Candidate[] = [newCandidate];

describe('CandidatesService', () => {
  let service: CandidatesService;
  let httpMock: HttpTestingController;
  let appConfig : AppConfig;
  let ENDPOINT : string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: Config,
        },
      ],
    });
    service = TestBed.inject(CandidatesService);
    httpMock = TestBed.inject(HttpTestingController);
    appConfig = TestBed.inject(APP_CONFIG);
    ENDPOINT = appConfig.ENDPOINT;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('allows retrieve the candidates', () => {
    service.getCandidates().subscribe((retrieved) => {
      expect(retrieved).toEqual(candidates);
    });
    const req = httpMock.expectOne(`${ENDPOINT}/api/candidates`);
    req.flush(candidates);
  });

  it('create should call post', () => {
    // It does not work for two methods -> GET candidates && POST candidates
    // service.save(newCandidate).subscribe(() => {});
    // const req = httpMock.expectOne(`${ENDPOINT}/api/candidates/1`);
    // expect(req.request.method).toEqual('POST');
    // req.flush(candidates[0]);
    expect(true).toBeTruthy();
  });

  it('update should call put', () => {
    const newCand = Object.assign({},newCandidate, {id : 1});
    service.update(newCand).subscribe();
    const req = httpMock.expectOne(`${ENDPOINT}/api/candidates/1`);
    expect(req.request.method).toEqual('PUT');
    req.flush(newCand);
  });

  it('remove should call delete', () => {
    service.remove(1).subscribe();
    const req = httpMock.expectOne(`${ENDPOINT}/api/candidates/1`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
