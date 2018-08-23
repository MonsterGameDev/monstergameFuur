import { TestBed, inject } from '@angular/core/testing';

import { AddHeaderInterceptorService } from './add-header-interceptor.service';

describe('AddHeaderInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddHeaderInterceptorService]
    });
  });

  it('should be created', inject([AddHeaderInterceptorService], (service: AddHeaderInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
