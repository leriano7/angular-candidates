import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { APP_CONFIG, Config } from 'src/config/app.config';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
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
