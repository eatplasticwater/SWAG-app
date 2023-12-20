import { TestBed } from '@angular/core/testing';

import { FontSizeService } from './font-size.service';

describe('FontSizeService', () => {
  let service: FontSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
