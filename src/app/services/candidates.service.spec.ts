import { TestBed } from '@angular/core/testing';

import { CandidatesService } from './candidates.service';
import { APP_CONFIG, Config } from 'src/config/app.config';

describe('CandidatesService', () => {
  let service: CandidatesService;

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
});
