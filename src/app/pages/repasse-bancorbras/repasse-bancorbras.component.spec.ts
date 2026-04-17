import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepasseBancorbrasComponent } from './repasse-bancorbras.component';

describe('RepasseBancorbrasComponent', () => {
  let component: RepasseBancorbrasComponent;
  let fixture: ComponentFixture<RepasseBancorbrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepasseBancorbrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepasseBancorbrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
