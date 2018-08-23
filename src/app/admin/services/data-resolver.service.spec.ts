import { TestBed, inject } from '@angular/core/testing';

import { DataResolverService } from './data-resolver.service';

describe('DataResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataResolverService]
    });
  });

  it('should be created', inject([DataResolverService], (service: DataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
