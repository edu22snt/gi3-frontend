import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrestacaoServicoFormComponent } from './prestacao-servico-form.component';


describe('PrestacaoServicoFormComponent', () => {
  let component: PrestacaoServicoFormComponent;
  let fixture: ComponentFixture<PrestacaoServicoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestacaoServicoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestacaoServicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
