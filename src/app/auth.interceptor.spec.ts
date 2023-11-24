import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { APP_CONFIG, Config } from 'src/config/app.config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [HttpClientTestingModule],
    providers: [
      AuthInterceptor, {
        provide: APP_CONFIG,
        useValue : Config
      }]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
