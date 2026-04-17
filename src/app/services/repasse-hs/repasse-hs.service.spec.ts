import { TestBed } from '@angular/core/testing';
import { RepasseHsService } from './repasse-hs.service';


describe('RepasseHsService', () => {
  let service: RepasseHsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepasseHsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
