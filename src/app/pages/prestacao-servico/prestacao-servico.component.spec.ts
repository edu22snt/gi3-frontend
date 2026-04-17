import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacaoServicoComponent } from './prestacao-servico.component';

describe('PrestacaoServicoComponent', () => {
  let component: PrestacaoServicoComponent;
  let fixture: ComponentFixture<PrestacaoServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestacaoServicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestacaoServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
