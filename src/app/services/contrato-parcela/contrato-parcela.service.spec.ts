import { TestBed } from '@angular/core/testing';
import { ContratoParcelaService } from './contrato-parcela.service';

describe('ContratoParcelaService', () => {
  let service: ContratoParcelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoParcelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
