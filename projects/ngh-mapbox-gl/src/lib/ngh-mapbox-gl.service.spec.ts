import { TestBed } from '@angular/core/testing';

import { NghMapboxGlService } from './ngh-mapbox-gl.service';

describe('NghMapboxGlService', () => {
  let service: NghMapboxGlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NghMapboxGlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
