import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepasseBancorbrasFormComponent } from './repasse-bancorbras-form.component';

describe('RepasseBancorbrasFormComponent', () => {
  let component: RepasseBancorbrasFormComponent;
  let fixture: ComponentFixture<RepasseBancorbrasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepasseBancorbrasFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepasseBancorbrasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
