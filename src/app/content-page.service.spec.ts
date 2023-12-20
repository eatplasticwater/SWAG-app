import { TestBed } from '@angular/core/testing';

import { ContentPageService } from './content-page.service';

describe('ContentPageService', () => {
  let service: ContentPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
