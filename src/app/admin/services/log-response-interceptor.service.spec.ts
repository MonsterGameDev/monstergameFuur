import { TestBed, inject } from '@angular/core/testing';

import { LogResponseInterceptorService } from './log-response-interceptor.service';

describe('LogResponseInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogResponseInterceptorService]
    });
  });

  it('should be created', inject([LogResponseInterceptorService], (service: LogResponseInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
