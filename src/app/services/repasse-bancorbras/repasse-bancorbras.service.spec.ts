import { TestBed } from '@angular/core/testing';
import { RepasseBancorbrasService } from './repasse-bancorbras.service';

describe('RepasseBancorbrasService', () => {
  let service: RepasseBancorbrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepasseBancorbrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
