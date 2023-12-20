import { TestBed } from '@angular/core/testing';

import { SwagDataService } from './swag-data.service';

describe('SwagDataService', () => {
  let service: SwagDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwagDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
