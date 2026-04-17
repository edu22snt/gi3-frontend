import { TestBed } from '@angular/core/testing';

import { PrestacaoServicoService } from './prestacao-servico.service';

describe('PrestacaoServicoService', () => {
  let service: PrestacaoServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestacaoServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
